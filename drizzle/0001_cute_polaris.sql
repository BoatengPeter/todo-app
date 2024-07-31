ALTER TABLE "todo-app_todos" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "todo-app_todos" ALTER COLUMN "updated_at" DROP NOT NULL;