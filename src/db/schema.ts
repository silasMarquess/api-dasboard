import { relations } from 'drizzle-orm';
import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const salerTable = pgTable('salers', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: integer('id_product').notNull(),
  quantity: integer('quantity').notNull(),
  date: timestamp('date').notNull(),
  productPriceInCents: integer('product_price_in_cents').notNull(),
  deleveryManId: uuid('delivery_man_id').references(() => deliveryManTable.id, {
    onDelete: 'set null',
  }),

  wholerSalerId: uuid('wholer_saler_id').references(() => wholerSalerTable.id, {
    onDelete: 'set null',
  }),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const salerRelation = relations(salerTable, ({ one, many }) => ({
  deleveryMan: one(deliveryManTable, {
    fields: [salerTable.deleveryManId],
    references: [deliveryManTable.id],
  }),

  payments: many(paymentTable),
  wholesaler: one(wholerSalerTable, {
    fields: [salerTable.wholerSalerId],
    references: [wholerSalerTable.id],
  }),
}));

export const deliveryManTable = pgTable('deliveryManTable', {
  id: uuid('id').primaryKey().defaultRandom(),
  fullName: varchar('name').notNull(),
  inDate: timestamp('in_date').notNull(),
  outDate: timestamp('out_date'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const deleveryManRelations = relations(deliveryManTable, ({ many }) => ({
  salers: many(salerTable),
}));

export const wholerSalerTable = pgTable('wholerSalerTable', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const wholerSalerRelations = relations(wholerSalerTable, ({ many }) => ({
  salers: many(salerTable),
}));

export const paymentTable = pgTable('payments', {
  id: uuid('id').primaryKey().defaultRandom(),
  paymentDate: timestamp('date').notNull(),
  paymenValueInCents: integer('value_in_cents').notNull(),
  discountValueInCents: integer('discount_value_in_cents').notNull(),
  typePay: integer('typepay').notNull(),
  id_saler: uuid('id_saler')
    .references(() => salerTable.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const payRelation = relations(paymentTable, ({ one }) => ({
  saler: one(salerTable, {
    fields: [paymentTable.id_saler],
    references: [salerTable.id],
  }),
}));

export const stockDayTable = pgTable('stocks', {
  id: uuid('id_stockDay').primaryKey().defaultRandom(),
  date: timestamp('date').notNull(),
  stock: integer('quantity').notNull(),
  stockStart: integer('quantity_start').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const stockMovimentTable = pgTable('stockMoviment', {
  id: uuid('id_stockMoviment').primaryKey().defaultRandom(),
  quantity: integer('quantity').notNull(),
  type: integer('type').notNull(),
  stockDay_id: uuid('stockday_id')
    .references(() => stockDayTable.id, {
      onDelete: 'cascade',
    })
    .notNull(),
});

export const stockMovimentRelations = relations(
  stockMovimentTable,
  ({ one }) => ({
    stockDay: one(stockDayTable, {
      fields: [stockMovimentTable.stockDay_id],
      references: [stockDayTable.id],
    }),
  }),
);

export const stockdayrelations = relations(stockDayTable, ({ many }) => ({
  stockerMivments: many(stockMovimentTable),
}));
