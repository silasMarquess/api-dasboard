ALTER TABLE "deliveries" ALTER COLUMN "date" SET DEFAULT '2025-09-06T17:44:16.777Z';--> statement-breakpoint
ALTER TABLE "stockDayMoviments" ADD COLUMN "type_mov" integer NOT NULL;