/*
  Warnings:

  - The values [Github] on the enum `AuthType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AuthType_new" AS ENUM ('Google', 'Apple');
ALTER TABLE "Merchant" ALTER COLUMN "auth_type" TYPE "AuthType_new" USING ("auth_type"::text::"AuthType_new");
ALTER TYPE "AuthType" RENAME TO "AuthType_old";
ALTER TYPE "AuthType_new" RENAME TO "AuthType";
DROP TYPE "AuthType_old";
COMMIT;

-- CreateTable
CREATE TABLE "MerchantBalance" (
    "id" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "locked" INTEGER NOT NULL,

    CONSTRAINT "MerchantBalance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MerchantTransaction" (
    "id" TEXT NOT NULL,
    "status" "OnRampStatus" NOT NULL,
    "token" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "merchantId" TEXT NOT NULL,

    CONSTRAINT "MerchantTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MerchantBalance_merchantId_key" ON "MerchantBalance"("merchantId");

-- AddForeignKey
ALTER TABLE "MerchantBalance" ADD CONSTRAINT "MerchantBalance_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MerchantTransaction" ADD CONSTRAINT "MerchantTransaction_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
