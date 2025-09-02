ALTER TABLE "deliveries" DROP CONSTRAINT "deliveries_id_saler_salers_id_fk";
--> statement-breakpoint
ALTER TABLE "deliveries" ALTER COLUMN "id_deliveryman" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_id_saler_salers_id_fk" FOREIGN KEY ("id_saler") REFERENCES "public"."salers"("id") ON DELETE cascade ON UPDATE no action;