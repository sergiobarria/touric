/*
  Warnings:

  - The values [EASY,MEDIUM,DIFFICULT] on the enum `Difficulty` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Difficulty_new" AS ENUM ('easy', 'medium', 'difficult');
ALTER TABLE "tours" ALTER COLUMN "difficulty" DROP DEFAULT;
ALTER TABLE "tours" ALTER COLUMN "difficulty" TYPE "Difficulty_new" USING ("difficulty"::text::"Difficulty_new");
ALTER TYPE "Difficulty" RENAME TO "Difficulty_old";
ALTER TYPE "Difficulty_new" RENAME TO "Difficulty";
DROP TYPE "Difficulty_old";
ALTER TABLE "tours" ALTER COLUMN "difficulty" SET DEFAULT 'easy';
COMMIT;

-- AlterTable
ALTER TABLE "tours" ALTER COLUMN "difficulty" SET DEFAULT 'easy';
