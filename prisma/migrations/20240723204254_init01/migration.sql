-- CreateTable
CREATE TABLE "User" (
    "IdUser" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "correo" TEXT,
    "usuario" TEXT,
    "password" TEXT,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("IdUser")
);

-- CreateTable
CREATE TABLE "Product" (
    "IdProducto" SERIAL NOT NULL,
    "nombre" TEXT,
    "precio" DECIMAL(65,30) NOT NULL,
    "stock" BOOLEAN NOT NULL DEFAULT true,
    "imagen" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "IdCategoria" INTEGER,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("IdProducto")
);

-- CreateTable
CREATE TABLE "Category" (
    "IdCategoria" SERIAL NOT NULL,
    "nombre" TEXT,
    "imagen" TEXT,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("IdCategoria")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_IdCategoria_fkey" FOREIGN KEY ("IdCategoria") REFERENCES "Category"("IdCategoria") ON DELETE SET NULL ON UPDATE CASCADE;
