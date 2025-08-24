DROP TABLE "stock_clients" CASCADE;--> statement-breakpoint
ALTER TABLE "clients" ADD COLUMN "stock_gaz" integer NOT NULL;