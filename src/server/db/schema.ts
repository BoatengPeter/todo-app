import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  text,
  boolean,
  integer,
} from "drizzle-orm/pg-core";


export const createTable = pgTableCreator((name) => `todo-app_${name}`);

export const todos = createTable(
  "todos",
  {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    status: boolean("status").default(false),
    description: text("description"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (todos) => ({
    todoIndex: index("todo_idx").on(todos.title),
  })
);

export const subTasks = createTable(
  "sub_tasks",
  {
    id: serial("id").primaryKey(),
    todoId:integer("todo_id").references(() => todos.id).notNull(),
    title: text("title").notNull(),
    status: boolean("status").default(false),
    description: text("description"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (subTasks) => ({
    subTaskIndex: index("sub_task_idx").on(subTasks.title),
  })
);
