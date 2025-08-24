import { relations } from 'drizzle-orm';
import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const regionTable = pgTable('regions', {
  id: uuid('id').primaryKey().defaultRandom(),
  description: varchar('description', { length: 100 }).notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const regionRelations = relations(regionTable, ({ many }) => ({
  clients: many(clientTable),
}));

export const clientTable = pgTable('clients', {
  id: uuid('id').primaryKey().defaultRandom(),
  fullName: varchar('name', { length: 100 }).notNull().unique(),
  stockGaz: integer('stock_gaz').notNull().default(0),
  regionId: uuid('region_id').references(() => regionTable.id, {
    onDelete: 'set null',
  }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const clientRelations = relations(clientTable, ({ one, many }) => ({
  region: one(regionTable, {
    fields: [clientTable.regionId],
    references: [regionTable.id],
  }),

  salers: many(salerTable),
}));
export const priceTable = pgTable('prices', {
  id: uuid('id').primaryKey().defaultRandom(),
  description: varchar('description', { length: 100 }).notNull().unique(),
  priceInCents: integer('price_in_cents').notNull(),
  id_products: uuid('id_products').references(() => productTable.id, {
    onDelete: 'cascade',
  }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
export const priceRelations = relations(priceTable, ({ one, many }) => ({
  product: one(productTable, {
    fields: [priceTable.id_products],
    references: [productTable.id],
  }),
  salers: many(salerTable),
}));
export const productTable = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  description: varchar('description', { length: 100 }).notNull().unique(),

  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const productTableRelations = relations(productTable, ({ many }) => ({
  productStock: many(productStockTable),
}));

export const productStockTable = pgTable('product_stocks', {
  id: uuid('id').primaryKey().defaultRandom(),
  description: varchar('description', { length: 100 }).notNull().unique(),
  stock: integer('stock').notNull().default(0),
  id_product: uuid('id_product').references(() => productTable.id, {
    onDelete: 'cascade',
  }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const productStockTableRelations = relations(
  productStockTable,
  ({ one }) => ({
    product: one(productTable, {
      fields: [productStockTable.id_product],
      references: [productTable.id],
    }),
  }),
);

export const salerTable = pgTable('salers', {
  id: uuid('id').primaryKey().defaultRandom(),
  paymentType: integer('payment_type').notNull(),
  date: timestamp('date', { withTimezone: true }),
  valuePaidInCents: integer('value_paid_in_cents').notNull(),
  discountInCents: integer('discount_in_cents').notNull(),
  quantity: integer('quantity').notNull(),
  id_tableprice: uuid('id_tableprice').references(() => priceTable.id, {
    onDelete: 'set null',
  }),
  id_client: uuid('id_client').references(() => clientTable.id, {
    onDelete: 'set null',
  }),
  id_deliveryman: uuid('id_deliveryman').references(() => deliveryManTable.id, {
    onDelete: 'set null',
  }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
export const salerRelations = relations(salerTable, ({ one }) => ({
  deliveryMan: one(deliveryManTable, {
    fields: [salerTable.id_deliveryman],
    references: [deliveryManTable.id],
  }),

  tablePrice: one(priceTable, {
    fields: [salerTable.id_tableprice],
    references: [priceTable.id],
  }),

  client: one(clientTable, {
    fields: [salerTable.id_client],
    references: [clientTable.id],
  }),
}));
export const deliveryManTable = pgTable('delivery_mans', {
  id: uuid('id').primaryKey().defaultRandom(),
  fullName: varchar('name', { length: 100 }).notNull().unique(),
  dateIn: timestamp('date_in', { withTimezone: true }).notNull(),
  birthDate: timestamp('birth_date', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
export const deliveryManRelations = relations(deliveryManTable, ({ many }) => ({
  salers: many(salerTable),
}));
