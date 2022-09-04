-- CreateEnum
CREATE TYPE "ProxyStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProxyList" (
    "key" TEXT NOT NULL,
    "rotatingIndex" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ProxyList_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "Proxy" (
    "id" SERIAL NOT NULL,
    "host" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "totalHits" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "status" "ProxyStatus" NOT NULL,
    "proxyListId" TEXT NOT NULL,

    CONSTRAINT "Proxy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ProxyList_username_key" ON "ProxyList"("username");

-- AddForeignKey
ALTER TABLE "ProxyList" ADD CONSTRAINT "ProxyList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proxy" ADD CONSTRAINT "Proxy_proxyListId_fkey" FOREIGN KEY ("proxyListId") REFERENCES "ProxyList"("key") ON DELETE RESTRICT ON UPDATE CASCADE;
