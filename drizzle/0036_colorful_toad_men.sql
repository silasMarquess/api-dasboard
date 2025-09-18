CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"passwordHash" text NOT NULL,
	"role" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "contracts" ALTER COLUMN "date_end" SET DEFAULT '2025-09-17T23:24:13.234Z';--> statement-breakpoint
ALTER TABLE "deliveries" ALTER COLUMN "date" SET DEFAULT '2025-09-17T23:24:13.235Z';