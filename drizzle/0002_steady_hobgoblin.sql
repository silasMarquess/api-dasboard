CREATE TABLE "clients" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"region_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "delivery_mans" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "prices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"description" varchar(100) NOT NULL,
	"price_in_cents" integer NOT NULL,
	"id_products" uuid
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"price_in_cents" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "regions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stock_clients" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"stockgaz" integer NOT NULL,
	"relation_model" integer NOT NULL,
	"id_client" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
ALTER TABLE "deliveryManTable" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "payments" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "stocks" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "stockMoviment" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "wholerSalerTable" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "deliveryManTable" CASCADE;--> statement-breakpoint
DROP TABLE "payments" CASCADE;--> statement-breakpoint
DROP TABLE "stocks" CASCADE;--> statement-breakpoint
DROP TABLE "stockMoviment" CASCADE;--> statement-breakpoint
DROP TABLE "wholerSalerTable" CASCADE;--> statement-breakpoint
ALTER TABLE "salers" DROP CONSTRAINT "salers_delivery_man_id_deliveryManTable_id_fk";
--> statement-breakpoint
ALTER TABLE "salers" DROP CONSTRAINT "salers_wholer_saler_id_wholerSalerTable_id_fk";
--> statement-breakpoint
ALTER TABLE "salers" ALTER COLUMN "date" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "salers" ALTER COLUMN "date" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "salers" ADD COLUMN "payment_type" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "salers" ADD COLUMN "value_paid_in_cents" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "salers" ADD COLUMN "discount_in_cents" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "salers" ADD COLUMN "id_tableprice" uuid;--> statement-breakpoint
ALTER TABLE "salers" ADD COLUMN "id_client" uuid;--> statement-breakpoint
ALTER TABLE "salers" ADD COLUMN "id_deliveryman" uuid;--> statement-breakpoint
ALTER TABLE "clients" ADD CONSTRAINT "clients_region_id_regions_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."regions"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "prices" ADD CONSTRAINT "prices_id_products_products_id_fk" FOREIGN KEY ("id_products") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stock_clients" ADD CONSTRAINT "stock_clients_id_client_clients_id_fk" FOREIGN KEY ("id_client") REFERENCES "public"."clients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "salers" ADD CONSTRAINT "salers_id_tableprice_prices_id_fk" FOREIGN KEY ("id_tableprice") REFERENCES "public"."prices"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "salers" ADD CONSTRAINT "salers_id_client_clients_id_fk" FOREIGN KEY ("id_client") REFERENCES "public"."clients"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "salers" ADD CONSTRAINT "salers_id_deliveryman_delivery_mans_id_fk" FOREIGN KEY ("id_deliveryman") REFERENCES "public"."delivery_mans"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "salers" DROP COLUMN "id_product";--> statement-breakpoint
ALTER TABLE "salers" DROP COLUMN "product_price_in_cents";--> statement-breakpoint
ALTER TABLE "salers" DROP COLUMN "delivery_man_id";--> statement-breakpoint
ALTER TABLE "salers" DROP COLUMN "wholer_saler_id";--> statement-breakpoint
ALTER TABLE "salers" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "salers" DROP COLUMN "updated_at";