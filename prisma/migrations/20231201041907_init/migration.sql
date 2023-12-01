-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'DIFFICULT');

-- CreateTable
CREATE TABLE "tours" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "max_group_size" INTEGER NOT NULL,
    "difficulty" "Difficulty" NOT NULL DEFAULT 'EASY',
    "ratings_avg" DOUBLE PRECISION NOT NULL DEFAULT 4.5,
    "ratings_qty" INTEGER NOT NULL DEFAULT 0,
    "price" DOUBLE PRECISION NOT NULL,
    "price_discount" DOUBLE PRECISION,
    "summary" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_cover" TEXT NOT NULL,
    "images" TEXT[],
    "start_dates" TIMESTAMP(3)[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tours_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tours_name_key" ON "tours"("name");
