CREATE TABLE "product_stocks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"description" varchar(100) NOT NULL,
	"stock" integer DEFAULT 0 NOT NULL,
	"id_product" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "product_stocks_description_unique" UNIQUE("description")
);
--> statement-breakpoint
ALTER TABLE "products" DROP CONSTRAINT "products_name_unique";--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "description" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "product_stocks" ADD CONSTRAINT "product_stocks_id_product_products_id_fk" FOREIGN KEY ("id_product") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "price_in_cents";--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_description_unique" UNIQUE("description");