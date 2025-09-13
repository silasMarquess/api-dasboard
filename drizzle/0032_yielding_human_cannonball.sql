ALTER TABLE "deliveries" ALTER COLUMN "date" SET DEFAULT '2025-09-13T03:35:24.628Z';--> statement-breakpoint
ALTER TABLE "contracts" ADD COLUMN "stock_now" integer NOT NULL;