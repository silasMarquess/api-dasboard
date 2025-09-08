CREATE TABLE "stockDayMoviments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"quantity" integer NOT NULL,
	"date" timestamp with time zone DEFAULT now() NOT NULL,
	"type" integer NOT NULL,
	"id_stockProduct" uuid,
	"id_contract" uuid,
	"id_stockDay" uuid,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stockDays" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"start_stock" integer NOT NULL,
	"end_stock" integer NOT NULL,
	"date" timestamp with time zone DEFAULT now() NOT NULL,
	"status" integer NOT NULL,
	CONSTRAINT "date_status_unique_idx" UNIQUE("status","date")
);
--> statement-breakpoint
ALTER TABLE "deliveries" ALTER COLUMN "date" SET DEFAULT '2025-09-06T15:12:53.676Z';--> statement-breakpoint
ALTER TABLE "stockDayMoviments" ADD CONSTRAINT "stockDayMoviments_id_stockProduct_product_stocks_id_fk" FOREIGN KEY ("id_stockProduct") REFERENCES "public"."product_stocks"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stockDayMoviments" ADD CONSTRAINT "stockDayMoviments_id_contract_contracts_id_fk" FOREIGN KEY ("id_contract") REFERENCES "public"."contracts"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stockDayMoviments" ADD CONSTRAINT "stockDayMoviments_id_stockDay_stockDays_id_fk" FOREIGN KEY ("id_stockDay") REFERENCES "public"."stockDays"("id") ON DELETE cascade ON UPDATE no action;