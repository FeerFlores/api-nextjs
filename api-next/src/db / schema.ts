import { sql } from "drizzle-orm";
import { index, integer, pgTable, text, timestamp, unique, uuid } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id:            uuid("id").primaryKey().defaultRandom(),
  slug:          text("slug").notNull().unique(),
  title:         text("title").notNull(),
  description:   text("description").notNull(),
  img:           text("img").notNull(),
  githubUrl:     text("github_url"),
  shopUrl:       text("shop_url"),
  firstStepsUrl: text("first_steps_url"),
  projects:      text("projects").array().notNull().default(sql`'{}'::text[]`),
  sku:           text("sku").notNull().unique(),
  ue:            text("ue").notNull(),
  manualUrl:     text("manual_url"),
  schematicUrl:  text("schematic_url"),
  pinoutUrl:     text("pinout_url"),
  dimensionsUrl: text("dimensions_url"),
  createdAt:     timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt:     timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()), // se actualiza solo en cada UPDATE hecho con Drizzle
}).enableRLS();

export const chapters = pgTable(
  "chapters",
  {
    id:        uuid("id").primaryKey().defaultRandom(),
    productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
    slug:      text("slug").notNull(),
    title:     text("title").notNull(),
    position:  integer("position").notNull(),
    content:   text("content").notNull(),
  },
  (t) => [
    unique("chapters_product_slug_unique").on(t.productId, t.slug),
    index("chapters_product_position_idx").on(t.productId, t.position),
  ],
).enableRLS();