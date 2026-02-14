import { relations } from "drizzle-orm"
import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { user } from "./auth"

export const bilibiliCredentials = pgTable(
  "bilibili_credentials",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    sessdata: text("sessdata").notNull(), // AES-256-GCM encrypted
    biliJct: text("bili_jct").notNull(), // AES-256-GCM encrypted
    buvid3: text("buvid3").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("bilibili_credentials_userId_idx").on(table.userId)]
)

export const bilibiliCredentialsRelations = relations(bilibiliCredentials, ({ one }) => ({
  user: one(user, {
    fields: [bilibiliCredentials.userId],
    references: [user.id],
  }),
}))
