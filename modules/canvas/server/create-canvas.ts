"use server";

import { db } from "@/drizzle/db";
import { excalidrawProjects } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function getProjects() {
    const result = await db.select().from(excalidrawProjects).orderBy(excalidrawProjects.createdAt);
    return { projects: result };
}

export async function getProjectById(id: string) {
    try {
        const [project] = await db
        .select()
        .from(excalidrawProjects)
        .where(eq(excalidrawProjects.id, id));
    return {success:true, project};
    } catch (error) {
        console.log(error)
        return {success:false, error: "Project not found"};
    }
}

export async function createProject(title: string) {
    try {
        const [project] = await db
        .insert(excalidrawProjects)
        .values({ title })
        .returning();
    return {success:true, project};
    } catch (error) {
        console.log(error)
        return {success:false, error: "Failed to create project"};
    }
}

export async function updateProject(id: string, data: {
    title?: string;
    editorData?: Record<string, any>;
}) {
    try {
        const [project] = await db
        .update(excalidrawProjects)
        .set(data)
        .where(eq(excalidrawProjects.id, id))
        .returning();
    return {success:true, project};
    } catch (error) {
        console.log(error)
        return {success:false, error: "Failed to update project"};
    }
}

export async function deleteProject(id: string) {
    await db
        .delete(excalidrawProjects)
        .where(eq(excalidrawProjects.id, id));
}