DO $$ BEGIN
 CREATE TYPE "difficulty" AS ENUM('easy', 'medium', 'difficult');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "tours" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"duration" integer NOT NULL,
	"max_group_size" integer NOT NULL,
	"difficulty" "difficulty" DEFAULT 'easy' NOT NULL,
	"ratings_average" real DEFAULT 4.5 NOT NULL,
	"ratings_quantity" integer DEFAULT 0 NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"price_discount" numeric(10, 2),
	"summary" text NOT NULL,
	"description" text,
	"image_cover" text NOT NULL,
	"images" text[],
	"start_dates" text[],
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
