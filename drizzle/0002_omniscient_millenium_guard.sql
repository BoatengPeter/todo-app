ALTER TABLE "todo-app_sub_tasks" DROP CONSTRAINT "todo-app_sub_tasks_todo_id_todo-app_todos_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "todo-app_sub_tasks" ADD CONSTRAINT "todo-app_sub_tasks_todo_id_todo-app_todos_id_fk" FOREIGN KEY ("todo_id") REFERENCES "public"."todo-app_todos"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "todo-app_sub_tasks" DROP COLUMN IF EXISTS "description";