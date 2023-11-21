-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "restrictedForAuction" BOOLEAN DEFAULT true,
    "isPreRegistration" BOOLEAN DEFAULT true,
    "updatedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "roles" (
    "roleName" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "users_roles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    CONSTRAINT "users_roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "users_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles" ("roleName") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "zipCode" TEXT,
    "address" TEXT,
    "number" TEXT,
    "neighborhood" TEXT,
    "city" TEXT,
    "state" TEXT,
    CONSTRAINT "address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "email" TEXT,
    "telephone" TEXT,
    "cellphone" TEXT,
    CONSTRAINT "contacts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "registration_data" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "nationality" TEXT,
    "maritalStatus" TEXT,
    "motherName" TEXT,
    "fatherName" TEXT,
    "occupation" TEXT,
    "company" TEXT,
    "companyWebsite" TEXT,
    CONSTRAINT "registration_data_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "stud_farm" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "farmName" TEXT,
    "email" TEXT,
    "telephone" TEXT,
    "cellphone" TEXT,
    "zipCode" TEXT,
    "address" TEXT,
    "number" TEXT,
    "neighborhood" TEXT,
    "city" TEXT,
    "state" TEXT,
    "updatedAt" DATETIME,
    CONSTRAINT "stud_farm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "documents" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "cnpj" TEXT,
    "ie" TEXT,
    "cpf" TEXT,
    "rg" TEXT,
    "passport" TEXT,
    CONSTRAINT "documents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "access_log" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "browser" TEXT NOT NULL,
    "geolocalization" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "access_log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "address_userId_key" ON "address"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "contacts_userId_key" ON "contacts"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "contacts_email_key" ON "contacts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "contacts_telephone_key" ON "contacts"("telephone");

-- CreateIndex
CREATE UNIQUE INDEX "contacts_cellphone_key" ON "contacts"("cellphone");

-- CreateIndex
CREATE UNIQUE INDEX "registration_data_userId_key" ON "registration_data"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "stud_farm_userId_key" ON "stud_farm"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "stud_farm_email_key" ON "stud_farm"("email");

-- CreateIndex
CREATE UNIQUE INDEX "stud_farm_telephone_key" ON "stud_farm"("telephone");

-- CreateIndex
CREATE UNIQUE INDEX "stud_farm_cellphone_key" ON "stud_farm"("cellphone");

-- CreateIndex
CREATE UNIQUE INDEX "documents_userId_key" ON "documents"("userId");
