ALTER TABLE "deliveries" ALTER COLUMN "date" SET DEFAULT '2025-09-08T13:17:35.098Z';--> statement-breakpoint
ALTER TABLE "stockDays" ADD COLUMN "id_product" uuid;--> statement-breakpoint
ALTER TABLE "stockDays" ADD CONSTRAINT "stockDays_id_product_products_id_fk" FOREIGN KEY ("id_product") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;