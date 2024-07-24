CREATE TABLE IF NOT EXISTS "todo-app_sub_tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"todo_id" integer NOT NULL,
	"title" text NOT NULL,
	"status" boolean DEFAULT false,
	"description" text,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "todo-app_todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"status" boolean DEFAULT false,
	"description" text,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "todo-app_sub_tasks" ADD CONSTRAINT "todo-app_sub_tasks_todo_id_todo-app_todos_id_fk" FOREIGN KEY ("todo_id") REFERENCES "public"."todo-app_todos"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "sub_task_idx" ON "todo-app_sub_tasks" ("title");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "todo_idx" ON "todo-app_todos" ("title");