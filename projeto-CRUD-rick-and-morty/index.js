require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDatabase = require("./src/database/database.js");

const charactersRoutes = require("./src/characters/character.route.js");
const userRoute = require("./src/users/users.route.js");
const authRoute = require("./src/auth/auth.route.js");

const port = process.env.PORT || 3001;
const app = express();
connectDatabase();

app.use(cors());
app.use(express.json());

const swagger = require('swagger-ui-express');
const swaggerDocument = require('./src/docs/swagger.json');
app.use("/docs", swagger.serve, swagger.setup(swaggerDocument));

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/characters", charactersRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});