import { relations, sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  text,
  // PgEnum,
  boolean,
  integer,
  varchar,
  
} from "drizzle-orm/pg-core";


export const createTable = pgTableCreator((name) => `todo-app_${name}`);

export const todos = createTable(
  "todos",
  {
    id: serial("id").primaryKey(),
    userId:varchar("userId",{length:256}).notNull(),
    title: text("title").notNull(),
    status: boolean("status").default(false).notNull(),
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
    todoId:integer("todo_id").references(() => todos.id,{onDelete:'cascade'}),
    title: text("title").notNull(),
    description: text("description"),
    status: boolean("status").default(false).notNull(),
    // priority:pgEnum("priority",['black','red','orange','blue','green']).default('black').notNull(),
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



export const todoRelations = relations(todos, ({ many }) => ({
  subTasks: many(subTasks),
}));

export const subTaskRelations = relations(subTasks, ({ one }) => ({
  todo: one(todos, {
    fields: [subTasks.todoId],
    references: [todos.id],
  }),
}));


