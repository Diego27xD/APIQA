const { Router } = require("express");
const { registrarUser, loginUser } = require("../controllers/auth.controller");

const routerUser = Router();

routerUser.post("/api/v1/auth/register", registrarUser);
routerUser.post("/api/v1/auth/login", loginUser);

module.exports = { routerUser };
