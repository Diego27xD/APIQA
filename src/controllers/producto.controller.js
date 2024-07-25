const { prisma } = require("../config/config");

const getProducts = async (req, res) => {
  try {
    const result = await prisma.product.findMany({
      where: {
        estado: true,
      },
    });
    res.status(200).json({
      header: {
        ok: true,
        message: "Operation was successful",
        status: 200,
      },
      data: result,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      header: {
        ok: false,
        message: "The operation had an error",
        status: 500,
      },
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { nombre, precio, stock, imagen, IdCategoria } = req.body;

    // Validaciones
    if (!nombre) {
      return res.status(400).json({
        header: {
          ok: false,
          message: "El nombre del producto es un valor requerido!",
          status: 400,
        },
      });
    }

    if (typeof nombre !== "string") {
      return res.status(400).json({
        header: {
          ok: false,
          message: "El nombre del producto tiene que ser un string",
          status: 400,
        },
      });
    }

    if (nombre.length >= 20) {
      return res.status(400).json({
        header: {
          ok: false,
          message: "El nombre debe contener máximo 20 caracteres",
          status: 400,
        },
      });
    }

    if (precio == null) {
      return res.status(400).json({
        header: {
          ok: false,
          message: "El precio del producto es un valor requerido!",
          status: 400,
        },
      });
    }

    if (isNaN(precio)) {
      return res.status(400).json({
        header: {
          ok: false,
          message: "El precio debe ser un valor entero o decimal!",
          status: 400,
        },
      });
    }

    if (precio <= 0) {
      return res.status(400).json({
        header: {
          ok: false,
          message: "El precio no puede tener un valor negativo o cero",
          status: 400,
        },
      });
    }
    if (stock) {
      if (typeof stock !== "boolean") {
        return res.status(400).json({
          header: {
            ok: false,
            message: "El stock deber ser un valor booleano",
            status: 400,
          },
        });
      }
    }

    if (!imagen) {
      return res.status(400).json({
        header: {
          ok: false,
          message: "La imagen es un valor requerido!",
          status: 400,
        },
      });
    }

    if (typeof imagen !== "string") {
      return res.status(400).json({
        header: {
          ok: false,
          message: "El valor de la imagen tiene que ser un string!",
          status: 400,
        },
      });
    }

    if (imagen.length >= 80) {
      return res.status(400).json({
        header: {
          ok: false,
          message: "El valor de la imagen debe contener máximo 80 caracteres",
          status: 400,
        },
      });
    }
    if (IdCategoria) {
      if (isNaN(IdCategoria)) {
        return res.status(400).json({
          header: {
            ok: false,
            message: "El Id de la categoría debe ser un entero",
            status: 400,
          },
        });
      }
    }

    const product = await prisma.product.findFirst({
      where: {
        nombre: nombre,
      },
    });

    if (product) {
      return res.status(400).json({
        header: {
          ok: false,
          message: "El producto ya ha sido creado!",
          status: 400,
        },
      });
    }

    const result = await prisma.product.create({
      data: {
        imagen,
        precio,
        IdCategoria,
        nombre,
        stock,
      },
      select: {
        nombre: true,
      },
    });

    res.status(201).json({
      header: {
        ok: true,
        message: "Operation was successfully",
        status: 201,
      },
      data: result,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      header: {
        ok: false,
        message: "The operation had an error",
        status: 500,
      },
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { IdProducto } = req.params;
    const { nombre, precio, stock, imagen, IdCategoria } = req.body;

    const result = await prisma.product.update({
      where: { IdProducto: Number(IdProducto) },
      data: {
        ...req.body,
      },
    });

    res.status(201).json({
      header: {
        ok: true,
        message: "The record was successfully updated",
        status: 201,
      },
      data: result,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      header: {
        ok: false,
        message: "The operation had an error",
        status: 500,
      },
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { IdProducto } = req.params;

    await prisma.product.update({
      where: { IdProducto: Number(IdProducto) },
      data: {
        estado: false,
      },
    });

    res.status(201).json({
      header: {
        ok: true,
        message: "The record was successfully deleted",
        status: 201,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      header: {
        ok: false,
        message: "The operation had an error",
        status: 500,
      },
    });
  }
};

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };
