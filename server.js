const express = require('express');
const { server } = require('./utils/config.json')
const app = express();
const libroRegisterRouter = require('./routers/libros/register/libroRouter')
const autorRegisterRouter = require('./routers/autores/register/autorRouter')
app.use(express.json());

app.use("/autor", autorRegisterRouter)
app.use("/libro", libroRegisterRouter);
//http://localhost:3000/autor/register

app.listen(server.port, ()=>{
    console.log("Server initialized on PORT: " + server.port)
});