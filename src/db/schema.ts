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
  constracts: many(constractTable),
}));

export const priceTable = pgTable('prices', {
  id: uuid('id').primaryKey().defaultRandom(),
  description: varchar('description', { length: 100 }).notNull().unique(),
  priceInCents: integer('price_in_cents').notNull(),
  id_products: uuid('id_products')
    .references(() => productTable.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const constractTable = pgTable('contracts', {
  id: uuid('id').primaryKey().defaultRandom(),
  id_client: uuid('id_client').references(() => clientTable.id, {
    onDelete: 'set null',
  }),
  id_product: uuid('id_product').references(() => productTable.id, {
    onDelete: 'set null',
  }),
  quantity: integer('quantity').notNull(),
  status: integer('status').notNull(), //0-abeta //1 - fechada 3-//cancelada)
  condition: integer('condition').notNull(),
  dateStart: timestamp('date_start', { withTimezone: true }).notNull(),
  dateEnd: timestamp('date_end', { withTimezone: true }),
});

export const constractRelations = relations(constractTable, ({ one }) => ({
  client: one(clientTable, {
    fields: [constractTable.id_client],
    references: [clientTable.id],
  }),

  product: one(productTable, {
    fields: [constractTable.id_product],
    references: [productTable.id],
  }),
}));

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
  prices: many(priceTable),
  Contract: many(constractTable),
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
  id_tableprice: uuid('id_tableprice')
    .references(() => priceTable.id, {
      onDelete: 'set null',
    })
    .notNull(),
  id_client: uuid('id_client').references(() => clientTable.id, {
    onDelete: 'set null',
  }),
  status: integer('status').notNull(), //0-abeta //1 - fechada 3-//cancelada

  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const deliveryTable = pgTable('deliveries', {
  id: uuid('id').primaryKey().defaultRandom(),
  id_saler: uuid('id_saler')
    .references(() => salerTable.id, {
      onDelete: 'set null',
    })
    .notNull(),
  id_deliveryman: uuid('id_deliveryman')
    .references(() => deliveryManTable.id, {
      onDelete: 'set null',
    })
    .notNull(),
});

export const deliveryTableRelations = relations(deliveryTable, ({ one }) => ({
  saler: one(salerTable, {
    fields: [deliveryTable.id_saler],
    references: [salerTable.id],
  }),

  deliveryMan: one(deliveryManTable, {
    fields: [deliveryTable.id_deliveryman],
    references: [deliveryManTable.id],
  }),
}));

export const salerRelations = relations(salerTable, ({ one, many }) => ({
  tablePrice: one(priceTable, {
    fields: [salerTable.id_tableprice],
    references: [priceTable.id],
  }),

  client: one(clientTable, {
    fields: [salerTable.id_client],
    references: [clientTable.id],
  }),
  deliverys: many(deliveryTable),
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
  deliveries: many(deliveryTable),
}));
