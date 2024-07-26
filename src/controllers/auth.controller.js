const { prisma } = require("../config/config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userSchema, loginSchema } = require("../schemas/product.schema");

// Secret key for JWT (should be in your environment variables)
const JWT_SECRET = process.env.JWT_SECRET || "djañsjdkasjdasdj1231";

// Función para registrar un nuevo usuario
const registrarUser = async (req, res) => {
  try {
    const { nombre, correo, password } = req.body;
    const { error, value } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        header: {
          ok: false,
          message: error.details[0]?.message,
          status: 400,
        },
      });
    }

    // Verificar si el correo o el usuario ya existen
    const existingUser = await prisma.user.findFirst({
      where: {
        correo: correo,
      },
    });

    if (existingUser) {
      return res.status(409).json({
        header: {
          ok: false,
          message: "El correo ya está en uso",
          status: 400,
        },
      });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario en la base de datos
    const newUser = await prisma.user.create({
      data: {
        nombre,
        correo,
        usuario: "@" + nombre,
        password: hashedPassword,
      },
      select: {
        correo: true,
        nombre: true,
        usuario: true,
        fechaCreacion: true,
      },
    });

    res.status(201).json({
      header: {
        ok: true,
        message: "Usuario registrado exitosamente",
        status: 201,
      },
      data: newUser,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      header: {
        ok: false,
        message: "Hubo un error en la operación",
        status: 500,
      },
    });
  }
};

// Función para iniciar sesión de usuario
const loginUser = async (req, res) => {
  try {
    const { correo, password } = req.body;
    const { error, value } = loginSchema.validate(req.body);
    // Validaciones básicas
    if (error) {
      return res.status(400).json({
        header: {
          ok: false,
          message: error.details[0]?.message,
          status: 400,
        },
      });
    }
    // Buscar el usuario en la base de datos
    const user = await prisma.user.findFirst({
      where: { correo },
    });

    if (!user) {
      return res.status(400).json({
        header: {
          ok: false,
          message: "Credenciales incorrectas",
          status: 400,
        },
      });
    }

    // Comparar la contraseña ingresada con la almacenada (hash)
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        header: {
          ok: false,
          message: "Credenciales incorrectas",
          status: 400,
        },
      });
    }

    // Generar el token JWT
    const token = jwt.sign({ userId: user.IdUser }, JWT_SECRET, {
      expiresIn: "3h",
    });

    res.status(200).json({
      header: {
        ok: true,
        message: "Inicio de sesión exitoso",
        status: 200,
      },
      data: {
        correo: user.correo,
        accessToken: token,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      header: {
        ok: false,
        message: "Hubo un error en la operación",
        status: 500,
      },
    });
  }
};

module.exports = { registrarUser, loginUser };
