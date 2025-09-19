ALTER TABLE "contracts" ALTER COLUMN "date_end" SET DEFAULT '2025-09-19T00:24:22.371Z';--> statement-breakpoint
ALTER TABLE "deliveries" ALTER COLUMN "date" SET DEFAULT '2025-09-19T00:24:22.372Z';--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "static_stock" integer NOT NULL;