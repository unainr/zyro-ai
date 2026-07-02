"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/drizzle/db";
import { userCredits } from "@/drizzle/schema";
import { eq, and, gte, sql } from "drizzle-orm";
import { MAX_GENERATION_COST, MIN_GENERATION_COST,FREE_MONTHLY_CREDITS, PRO_MONTHLY_CREDITS } from "@/lib/utils";


function isNewMonth(lastReset: Date) {
    const now = new Date();
    return (
        lastReset.getMonth() !== now.getMonth() ||
        lastReset.getFullYear() !== now.getFullYear()
    );
}

function randomGenerationCost() {
    return Math.floor(
        Math.random() * (MAX_GENERATION_COST - MIN_GENERATION_COST + 1)
    ) + MIN_GENERATION_COST;
}

async function getOrSyncCredits(userId: string, isPro: boolean) {
    const plan = isPro ? "pro" : "free";
    const monthlyLimit = isPro ? PRO_MONTHLY_CREDITS : FREE_MONTHLY_CREDITS;

    const [existing] = await db
        .select()
        .from(userCredits)
        .where(eq(userCredits.userId, userId));

    if (!existing) {
        const [created] = await db
            .insert(userCredits)
            .values({ userId, balance: monthlyLimit, plan })
            .returning();
        return created;
    }

    const needsReset = isNewMonth(existing.lastResetAt) || existing.plan !== plan;

    if (needsReset) {
        const [updated] = await db
            .update(userCredits)
            .set({
                balance: monthlyLimit,
                plan,
                lastResetAt: new Date(),
            })
            .where(eq(userCredits.userId, userId))
            .returning();
        return updated;
    }

    return existing;
}

export async function checkGenerationLimit() {
    const { userId, has } = await auth();
    if (!userId) return { success: false as const, error: "Unauthorized" };

    try {
        const isPro = has({ plan: "pro" });
        const credits = await getOrSyncCredits(userId, isPro);
        const limit = isPro ? PRO_MONTHLY_CREDITS : FREE_MONTHLY_CREDITS;

        return {
            success: true as const,
            isPro,
            balance: credits.balance,
            limit,
            canGenerate: credits.balance >= MIN_GENERATION_COST,
        };
    } catch (error) {
        console.error(error);
        return { success: false as const, error: "Failed to check limit" };
    }
}

export async function deductGenerationCredits() {
    const { userId } = await auth();
    if (!userId) return { success: false as const, error: "Unauthorized" };

    const cost = randomGenerationCost();

    try {
        const [updated] = await db
            .update(userCredits)
            .set({ balance: sql`${userCredits.balance} - ${cost}` })
            .where(
                and(
                    eq(userCredits.userId, userId),
                    gte(userCredits.balance, cost)
                )
            )
            .returning();

        if (!updated) {
            return { success: false as const, error: "Insufficient credits" };
        }

        return { success: true as const, balance: updated.balance, cost };
    } catch (error) {
        console.error(error);
        return { success: false as const, error: "Failed to deduct credits" };
    }
}