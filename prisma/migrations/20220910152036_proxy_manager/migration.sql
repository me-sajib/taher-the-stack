-- AlterTable
ALTER TABLE "Proxy" ADD COLUMN     "lastCheckAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "username" TEXT,
ALTER COLUMN "totalHits" SET DEFAULT 0;
