ALTER TABLE "clients" ADD CONSTRAINT "clients_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "delivery_mans" ADD CONSTRAINT "delivery_mans_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "prices" ADD CONSTRAINT "prices_description_unique" UNIQUE("description");--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_name_unique" UNIQUE("name");