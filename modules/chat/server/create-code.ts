"use server";

import { db } from "@/drizzle/db";
import { uiGenerations } from "@/drizzle/schema";
import { ImageUpload } from "@/lib/image-upload";
import {
	checkGenerationLimit,
	deductGenerationCredits,
} from "@/modules/billing/server/billing.actions";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";

export async function createGeneration(formData: FormData) {
	const { userId } = await auth();
	if (!userId) return { success: false, error: "Unauthorized" };

	// Check limit first
	const limit = await checkGenerationLimit();
	if (!limit.success) return { success: false, error: limit.error };
	if (!limit.canGenerate) {
		return {
			success: false,
			error: "LIMIT_REACHED",
			isPro: limit.isPro,
			balance: limit.balance,
			limitCount: limit.limit,
		};
	}

	const prompt = formData.get("prompt") as string;
	const file = formData.get("image") as File | null;

	if (!prompt?.trim()) return { success: false, error: "Prompt is required" };

	try {
		const imageUrl = file && file.size > 0 ? await ImageUpload(file) : null;

		const [generation] = await db
			.insert(uiGenerations)
			.values({ userId, prompt: prompt.trim(), imageUrl })
			.returning();

		// Deduct credits only after the generation row is successfully created
		const deducted = await deductGenerationCredits();
		if (!deducted.success) {
			console.error("Credit deduction failed after generation:", deducted.error);
			// generation already exists — don't fail the request, just log it
		}

		return { success: true, generation };
	} catch (error) {
		console.error(error);
		return { success: false, error: "Failed to create generation" };
	}
}

// get generations

export async function getGenerations() {
	const { userId } = await auth();
	if (!userId) return { success: false, error: "Unauthorized" };

	try {
		const result = await db
			.select()
			.from(uiGenerations)
			.where(eq(uiGenerations.userId, userId))
			.orderBy(uiGenerations.createdAt);

		return { success: true, generations: result };
	} catch (error) {
		console.error(error);
		return { success: false, error: "Failed to fetch generations" };
	}
}

export const getGenerationById = async (id: string) => {
	const { userId } = await auth();
	if (!userId) return { success: false, error: "Unauthorized" };
	try {
		const [result] = await db
			.select()
			.from(uiGenerations)
			.where(and(eq(uiGenerations.id, id), eq(uiGenerations.userId, userId)));
		if (!result) return { success: false, error: "Generation not found" };
		return { success: true, generation: result };
	} catch (error) {
		return { success: false, error: "Failed to fetch generation" };
	}
};

export async function saveGeneratedCode(id: string, code: string) {
	const { userId } = await auth();
	if (!userId) return { success: false, error: "Unauthorized" };

	try {
		const [generation] = await db
			.update(uiGenerations)
			.set({ generatedCode: { code } })
			.where(and(eq(uiGenerations.id, id), eq(uiGenerations.userId, userId)))
			.returning();

		return { success: true, generation };
	} catch (error) {
		console.error(error);
		return { success: false, error: "Failed to save code" };
	}
}


export async function deleteGeneration(id: string) {
	const { userId } = await auth();
	if (!userId) return { success: false, error: "Unauthorized" };

	try {
		const [deleted] = await db
			.delete(uiGenerations)
			.where(and(eq(uiGenerations.id, id), eq(uiGenerations.userId, userId)))
			.returning();

		if (!deleted) return { success: false, error: "Generation not found" };

		return { success: true, id: deleted.id };
	} catch (error) {
		console.error(error);
		return { success: false, error: "Failed to delete generation" };
	}
}