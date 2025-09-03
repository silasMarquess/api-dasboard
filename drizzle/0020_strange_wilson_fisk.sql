ALTER TABLE "contracts" DROP CONSTRAINT "contracts_id_product_products_id_fk";
--> statement-breakpoint
ALTER TABLE "contracts" ADD COLUMN "id_productVariant" uuid;--> statement-breakpoint
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_id_productVariant_prices_id_fk" FOREIGN KEY ("id_productVariant") REFERENCES "public"."prices"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contracts" DROP COLUMN "id_product";--> statement-breakpoint
ALTER TABLE "contracts" DROP COLUMN "condition";