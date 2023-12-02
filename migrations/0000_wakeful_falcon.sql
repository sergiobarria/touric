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
	"difficulty" "difficulty" NOT NULL,
	"ratings_avg" numeric(2, 1) NOT NULL,
	"ratings_quantity" integer NOT NULL,
	"price" numeric(8, 2) NOT NULL,
	"price_discount" numeric(8, 2),
	"summary" varchar(256) NOT NULL,
	"description" text,
	"image_cover" varchar(256) NOT NULL,
	"images" text[],
	"start_dates" text[]
);
