"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/drizzle/db";
import { uiGenerations } from "@/drizzle/schema";
import { eq, count, and, gte } from "drizzle-orm";

export async function checkGenerationLimit() {
    const { userId, has } = await auth();
    if (!userId) return { success: false, error: "Unauthorized" };

    try {
        const isPro = has({ plan: "pro" });
        const limit = isPro ? 30 : 10;

        // Count generations this month only
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const [result] = await db
            .select({ count: count() })
            .from(uiGenerations)
            .where(
                and(
                    eq(uiGenerations.userId, userId),
                    gte(uiGenerations.createdAt, startOfMonth)
                )
            );

        const used = result.count;
        const canGenerate = used < limit;
        const remaining = Math.max(limit - used, 0);

        return { success: true, canGenerate, isPro, used, limit, remaining };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Failed to check limit" };
    }
}