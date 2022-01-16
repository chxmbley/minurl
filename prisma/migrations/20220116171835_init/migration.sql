-- CreateTable
CREATE TABLE "MinifiedUrl" (
    "id" SERIAL NOT NULL,
    "slug" VARCHAR(32) NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MinifiedUrl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Redirect" (
    "id" SERIAL NOT NULL,
    "ipAddressHash" VARCHAR(32),
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "urlId" INTEGER NOT NULL,

    CONSTRAINT "Redirect_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MinifiedUrl_slug_key" ON "MinifiedUrl"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "MinifiedUrl_url_key" ON "MinifiedUrl"("url");

-- AddForeignKey
ALTER TABLE "Redirect" ADD CONSTRAINT "Redirect_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "MinifiedUrl"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
