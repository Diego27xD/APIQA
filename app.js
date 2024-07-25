const express = require("express");
const { router } = require("./src/routes/producto.router");
const { routerUser } = require("./src/routes/auth.router");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config;
const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
app.use(routerUser);

app.listen(PORT, () => console.log("Servidor corriendo en el puerto " + PORT));
