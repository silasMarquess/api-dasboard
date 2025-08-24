ALTER TABLE "regions" ADD COLUMN "description" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "regions" DROP COLUMN "name";