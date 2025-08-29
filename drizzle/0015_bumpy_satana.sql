CREATE TABLE "contracts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_client" uuid,
	"id_product" uuid,
	"quantity" integer NOT NULL,
	"date_start" timestamp with time zone NOT NULL,
	"date_end" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_id_client_clients_id_fk" FOREIGN KEY ("id_client") REFERENCES "public"."clients"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_id_product_products_id_fk" FOREIGN KEY ("id_product") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "clients" DROP COLUMN "stock_gaz";--> statement-breakpoint
ALTER TABLE "clients" DROP COLUMN "is_whole_saler";