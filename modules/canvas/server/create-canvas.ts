"use server";

import { db } from "@/drizzle/db";
import { excalidrawProjects } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";

export async function getProjects() {
    const { userId } = await auth();

    if (!userId) {
        return {
            success: false,
            error: "Unauthorized",
        };
    }

    try {
        const result = await db
            .select()
            .from(excalidrawProjects)
            .where(eq(excalidrawProjects.userId, userId))
            .orderBy(excalidrawProjects.createdAt);

        return {
            success: true,
            projects: result,
        };
    } catch (error) {
        console.log(error);

        return {
            success: false,
            error: "Failed to fetch projects",
        };
    }
}



export async function getProjectById(id: string) {
    const {userId} = await auth();
    if(!userId) return {success:false, error: "Unauthorized"};
    try {
        const [project] = await db
            .select()
            .from(excalidrawProjects)
            .where(
                and(
                    eq(excalidrawProjects.id, id),
                    eq(excalidrawProjects.userId, userId)
                )
            );

        if (!project) {
            return {
                success: false,
                error: "Project not found"
            };
        }

        return {
            success: true,
            project
        };
    } catch (error) {
        console.log(error);

        return {
            success: false,
            error: "Something went wrong"
        };
    }
}

export async function createProject(title: string) {
    const {userId} = await auth()
    if(!userId) return {success:false, error: "Unauthorized"};
    try {
        const [project] = await db
        .insert(excalidrawProjects)
        .values({ title ,userId} )
        .returning();
    return {success:true, project};
    } catch (error) {
        console.log(error)
        return {success:false, error: "Failed to create project"};
    }
}

export async function updateProject(
    id: string,
    data: {
        title?: string;
        editorData?: Record<string, any>;
    }
) {
    const { userId } = await auth();

    if (!userId) {
        return {
            success: false,
            error: "Unauthorized",
        };
    }

    try {
        const [project] = await db
            .update(excalidrawProjects)
            .set(data)
            .where(
                and(
                    eq(excalidrawProjects.id, id),
                    eq(excalidrawProjects.userId, userId)
                )
            )
            .returning();

        if (!project) {
            return {
                success: false,
                error: "Project not found",
            };
        }

        return {
            success: true,
            project,
        };
    } catch (error) {
        console.log(error);

        return {
            success: false,
            error: "Failed to update project",
        };
    }
}

export async function deleteProject(id: string) {
    const {userId} = await auth()
    if(!userId) return {success:false, error: "Unauthorized"};
   try {
     await db
        .delete(excalidrawProjects)
        .where(and(eq(excalidrawProjects.id, id),
        eq(excalidrawProjects.userId, userId)));
        return{success:true}
   } catch (error) {
    return {success:false, error: "Failed to delete project"};
   }
}