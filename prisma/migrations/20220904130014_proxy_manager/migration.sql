/*
  Warnings:

  - You are about to drop the column `proxyListKey` on the `Proxy` table. All the data in the column will be lost.
  - Added the required column `proxyListKey` to the `Proxy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Proxy` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Proxy" DROP CONSTRAINT "Proxy_proxyListKey_fkey";

-- AlterTable
ALTER TABLE "Proxy" DROP COLUMN "proxyListKey",
ADD COLUMN     "proxyListKey" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Proxy" ADD CONSTRAINT "Proxy_proxyListKey_fkey" FOREIGN KEY ("proxyListKey") REFERENCES "ProxyList"("key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proxy" ADD CONSTRAINT "Proxy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
