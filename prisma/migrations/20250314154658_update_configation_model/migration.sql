/*
  Warnings:

  - The values [WOOK] on the enum `FrameMaterial` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FrameMaterial_new" AS ENUM ('WOOD', 'METAL', 'PLASTIC', 'COMPOSITE');
ALTER TABLE "Configuration" ALTER COLUMN "material" TYPE "FrameMaterial_new" USING ("material"::text::"FrameMaterial_new");
ALTER TYPE "FrameMaterial" RENAME TO "FrameMaterial_old";
ALTER TYPE "FrameMaterial_new" RENAME TO "FrameMaterial";
DROP TYPE "FrameMaterial_old";
COMMIT;
