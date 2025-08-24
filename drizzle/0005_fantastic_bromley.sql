ALTER TABLE "delivery_mans" ADD COLUMN "date_in" timestamp with time zone NOT NULL;--> statement-breakpoint
ALTER TABLE "delivery_mans" ADD COLUMN "birth_date" timestamp with time zone NOT NULL;--> statement-breakpoint
ALTER TABLE "delivery_mans" ADD COLUMN "out_date" timestamp with time zone;