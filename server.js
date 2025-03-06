const express = require('express');
const { server } = require('./utils/config.json');
const cors = require('cors');
const app = express();


const libroGetRouter = require('./routers/libros/getLibros/getLibros');
const libroRegisterRouter = require('./routers/libros/register/libroRouter');
const autorGetRouter = require('./routers/autores/getAutores/getAutores');
const autorRegisterRouter = require('./routers/autores/register/autorRouter');
const userRegisterRouter = require('./routers/users/register/registerUser');
const userActivationRouter = require('./routers/users/register/activateUser');
const userLoginRouter = require('./routers/users/login/loginUser')
// CORS configuration
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: 'Content-Type, Authorization'
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/autor", autorGetRouter);
app.use("/autor", autorRegisterRouter);
app.use("/libro", libroRegisterRouter);
app.use("/libro", libroGetRouter);
app.use("/user", userRegisterRouter);
app.use("/user", userActivationRouter);
app.use("/user", userLoginRouter)

const datosRouter = require('./routers/datosRouter');
app.use("/", datosRouter);

app.listen(server.port, () => {
    console.log("Server initialized on PORT: " + server.port);
});