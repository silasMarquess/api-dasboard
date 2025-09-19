ALTER TABLE "product_stocks" DROP CONSTRAINT "product_stocks_description_unique";--> statement-breakpoint
ALTER TABLE "contracts" ALTER COLUMN "date_end" SET DEFAULT '2025-09-19T17:22:56.367Z';--> statement-breakpoint
ALTER TABLE "deliveries" ALTER COLUMN "date" SET DEFAULT '2025-09-19T17:22:56.367Z';--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "updated_at" DROP NOT NULL;