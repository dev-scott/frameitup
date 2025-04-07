/*
  Warnings:

  - You are about to drop the column `billingAddressId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `ShippingAddress` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `ShippingAddress` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `ShippingAddress` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `ShippingAddress` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `ShippingAddress` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `ShippingAddress` table. All the data in the column will be lost.
  - You are about to drop the `BillingAddress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_billingAddressId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "billingAddressId";

-- AlterTable
ALTER TABLE "ShippingAddress" DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "phoneNumber",
DROP COLUMN "postalCode",
DROP COLUMN "state",
DROP COLUMN "street",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "phone" TEXT,
ALTER COLUMN "name" DROP NOT NULL;

-- DropTable
DROP TABLE "BillingAddress";
