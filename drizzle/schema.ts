import {
	pgTable,
	uuid,
	text,
	timestamp,
	pgEnum,
	jsonb,
} from "drizzle-orm/pg-core";

/* =========================================================
   ENUMS
========================================================= */

export const designTypeEnum = pgEnum("design_type", [
	"system_flow",
	"database_design",
]);

/* =========================================================
   UI GENERATIONS
========================================================= */
/*
Main AI generation table

User can:
- write prompt
- upload reference image
- use exported wireframe image

AI generates:
- frontend UI
- React / Next.js code
- live preview
*/

export const uiGenerations = pgTable("ui_generations", {
	id: uuid("id").primaryKey().defaultRandom(),

	clerkUserId: text("clerk_user_id").notNull(),

	title: text("title"),

	prompt: text("prompt"),

	imageUrl: text("image_url"),

	generatedCode: jsonb("generated_code"),

	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow(),
});

/* =========================================================
   TLDRAW PROJECTS
========================================================= */
/*
User manually draws wireframes here

Save:
- TLDraw JSON data
- exported image
*/

export const excalidrawProjects = pgTable("excalidraw_projects", {
	id: uuid("id").primaryKey().defaultRandom(),

	title: text("title"),
	
  editorData: jsonb("editor_data").$type<Record<string, any>>(),

	createdAt: timestamp("created_at").defaultNow(),
	  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

/* =========================================================
   DB / SYSTEM DESIGNS
========================================================= */
/*
React Flow output

Used for:
- system flow
- database design
*/

export const dbDesigns = pgTable("db_designs", {
	id: uuid("id").primaryKey().defaultRandom(),

	title: text("title"),

	designType: designTypeEnum("design_type"),

	nodes: jsonb("nodes"),

	edges: jsonb("edges"),

	aiSummary: text("ai_summary"),

	generatedSql: text("generated_sql"),

	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow(),
});

/* =========================================================
   TYPES
========================================================= */

export type InsertUiGenerations = typeof uiGenerations.$inferInsert;
export type SelectUiGenerations = typeof uiGenerations.$inferSelect;

export type InsertexcalidrawProjects = typeof excalidrawProjects.$inferInsert;
export type SelectexcalidrawProjects = typeof excalidrawProjects.$inferSelect;

export type InsertDbDesigns = typeof dbDesigns.$inferInsert;
export type SelectDbDesigns = typeof dbDesigns.$inferSelect;
