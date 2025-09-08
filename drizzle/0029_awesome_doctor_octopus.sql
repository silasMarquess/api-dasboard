ALTER TABLE "stockDays" DROP CONSTRAINT "date_status_unique_idx";--> statement-breakpoint
ALTER TABLE "deliveries" ALTER COLUMN "date" SET DEFAULT '2025-09-08T14:43:40.115Z';--> statement-breakpoint
ALTER TABLE "stockDays" ADD CONSTRAINT "date_status_unique_idx" UNIQUE("status","date","id_product");