const { Router } = require("express");
const { registrarUser, loginUser } = require("../controllers/auth.controller");

const routerUser = Router();

routerUser.post("/api/v1/users", registrarUser);
routerUser.post("/api/v1/login", loginUser);

module.exports = { routerUser };
