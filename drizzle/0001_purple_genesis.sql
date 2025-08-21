CREATE TABLE "deliveryManTable" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"in_date" timestamp NOT NULL,
	"out_date" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"date" timestamp NOT NULL,
	"value_in_cents" integer NOT NULL,
	"discount_value_in_cents" integer NOT NULL,
	"typepay" integer NOT NULL,
	"id_saler" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stocks" (
	"id_stockDay" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"date" timestamp NOT NULL,
	"quantity" integer NOT NULL,
	"quantity_start" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stockMoviment" (
	"id_stockMoviment" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"quantity" integer NOT NULL,
	"type" integer NOT NULL,
	"stockday_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "wholerSalerTable" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "salers" ALTER COLUMN "date" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "salers" ADD COLUMN "id_product" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "salers" ADD COLUMN "delivery_man_id" uuid;--> statement-breakpoint
ALTER TABLE "salers" ADD COLUMN "wholer_saler_id" uuid;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_id_saler_salers_id_fk" FOREIGN KEY ("id_saler") REFERENCES "public"."salers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stockMoviment" ADD CONSTRAINT "stockMoviment_stockday_id_stocks_id_stockDay_fk" FOREIGN KEY ("stockday_id") REFERENCES "public"."stocks"("id_stockDay") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "salers" ADD CONSTRAINT "salers_delivery_man_id_deliveryManTable_id_fk" FOREIGN KEY ("delivery_man_id") REFERENCES "public"."deliveryManTable"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "salers" ADD CONSTRAINT "salers_wholer_saler_id_wholerSalerTable_id_fk" FOREIGN KEY ("wholer_saler_id") REFERENCES "public"."wholerSalerTable"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "salers" DROP COLUMN "product_name";