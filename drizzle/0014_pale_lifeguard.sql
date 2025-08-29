CREATE TABLE "deliveries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_saler" uuid NOT NULL,
	"id_deliveryman" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "salers" DROP CONSTRAINT "salers_id_deliveryman_delivery_mans_id_fk";
--> statement-breakpoint
ALTER TABLE "clients" ADD COLUMN "is_whole_saler" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "salers" ADD COLUMN "status" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_id_saler_salers_id_fk" FOREIGN KEY ("id_saler") REFERENCES "public"."salers"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_id_deliveryman_delivery_mans_id_fk" FOREIGN KEY ("id_deliveryman") REFERENCES "public"."delivery_mans"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "salers" DROP COLUMN "id_deliveryman";