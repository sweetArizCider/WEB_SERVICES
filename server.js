const express = require('express');
const { server } = require('./utils/config.json')
const app = express();
const libroGetRouter = require('./routers/libros/getLibros/getLibros');
const libroRegisterRouter = require('./routers/libros/register/libroRouter');
const autorGetRouter = require('./routers/autores/getAutores/getAutores');
const autorRegisterRouter = require('./routers/autores/register/autorRouter');
const userRegisterRouter = require('./routers/users/register/registerUser');

app.use(express.json());

app.use("/autor", autorGetRouter);
app.use("/autor", autorRegisterRouter);
app.use("/libro", libroRegisterRouter);
app.use("/libro", libroGetRouter);
app.use("/user", userRegisterRouter);

app.listen(server.port, ()=>{
    console.log("Server initialized on PORT: " + server.port)
});