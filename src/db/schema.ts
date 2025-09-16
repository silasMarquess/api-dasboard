import { relations } from 'drizzle-orm';
import {
  integer,
  pgTable,
  timestamp,
  uuid,
  unique,
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
  constracts: many(contractTable),
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
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const contractTable = pgTable(
  'contracts',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    id_client: uuid('id_client').references(() => clientTable.id, {
      onDelete: 'set null',
    }),
    id_productVariant: uuid('id_productVariant').references(
      () => priceTable.id,
      {
        onDelete: 'set null',
      },
    ),
    quantity: integer('quantity').notNull(),
    stockNow: integer('stock_now').notNull(),
    status: integer('status').notNull(), //0-abeta //1 - fechada 3-//cancelada)
    dateStart: timestamp('date_start', { withTimezone: true }).notNull(),
    dateEnd: timestamp('date_end', { withTimezone: true }).default(new Date()),
  },
  (table) => ({
    clientProductUnique: unique('client_product_unique_idx').on(
      table.id_client,
      table.id_productVariant,
      table.status,
    ),
  }),
);

export const contractRelations = relations(contractTable, ({ one, many }) => ({
  client: one(clientTable, {
    fields: [contractTable.id_client],
    references: [clientTable.id],
  }),

  productVariant: one(priceTable, {
    fields: [contractTable.id_productVariant],
    references: [priceTable.id],
  }),

  stockMoviments: many(StockDayMovimentTable),
}));

export const priceRelations = relations(priceTable, ({ one, many }) => ({
  product: one(productTable, {
    fields: [priceTable.id_products],
    references: [productTable.id],
  }),
  salers: many(salerTable),
  contracts: many(contractTable),
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
  Contract: many(contractTable),
  stocksDay: many(stockDayTable),
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
  ({ one, many }) => ({
    product: one(productTable, {
      fields: [productStockTable.id_product],
      references: [productTable.id],
    }),

    stockDayMoviments: many(StockDayMovimentTable),
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
      onDelete: 'cascade',
    })
    .notNull(),
  id_deliveryman: uuid('id_deliveryman').references(() => deliveryManTable.id, {
    onDelete: 'set null',
  }),
  date: timestamp('date', { withTimezone: true }).default(new Date()).notNull(),
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

export const stockDayTable = pgTable(
  'stockDays',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    startStock: integer('start_stock').notNull(),
    date: timestamp('date', { withTimezone: true }).notNull().defaultNow(),
    status: integer('status').notNull(),
    id_product: uuid('id_product')
      .references(() => productTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),
  },
  (table) => ({
    statusDateUnique: unique('date_status_unique_idx').on(
      table.status,
      table.date,
      table.id_product,
    ),
  }),
);

export const stockDayRelations = relations(stockDayTable, ({ one, many }) => ({
  stockDayMoviments: many(StockDayMovimentTable),
  product: one(productTable, {
    fields: [stockDayTable.id_product],
    references: [productTable.id],
  }),
}));

export const StockDayMovimentTable = pgTable('stockDayMoviments', {
  id: uuid('id').primaryKey().defaultRandom(),
  quantity: integer('quantity').notNull(),
  date: timestamp('date', { withTimezone: true }).notNull().defaultNow(),
  type: integer('type').notNull(),
  typeMov: integer('type_mov').notNull(),
  id_stockProduct: uuid('id_stockProduct').references(
    () => productStockTable.id,
    {
      onDelete: 'set null',
    },
  ),
  id_contract: uuid('id_contract').references(() => contractTable.id, {
    onDelete: 'set null',
  }),
  id_stockDay: uuid('id_stockDay')
    .references(() => stockDayTable.id, {
      onDelete: 'cascade',
    })
    .notNull(),

  createdAt: timestamp('createdAt').notNull().defaultNow(),
});

export const StockDayMovimentTableRelations = relations(
  StockDayMovimentTable,
  ({ one }) => ({
    stockDay: one(stockDayTable, {
      fields: [StockDayMovimentTable.id_stockDay],
      references: [stockDayTable.id],
    }),

    contract: one(contractTable, {
      fields: [StockDayMovimentTable.id_contract],
      references: [contractTable.id],
    }),

    product_stock: one(productStockTable, {
      fields: [StockDayMovimentTable.id_stockProduct],
      references: [productStockTable.id],
    }),
  }),
);
