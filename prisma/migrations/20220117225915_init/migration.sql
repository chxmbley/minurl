-- CreateTable
CREATE TABLE "MinifiedUrl" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Redirect" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ipAddressHash" TEXT,
    "userAgent" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "urlId" INTEGER NOT NULL,
    CONSTRAINT "Redirect_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "MinifiedUrl" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "MinifiedUrl_slug_key" ON "MinifiedUrl"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "MinifiedUrl_url_key" ON "MinifiedUrl"("url");
