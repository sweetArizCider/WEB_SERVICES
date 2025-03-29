require('dotenv').config();
const { server } = require('./utils/config.json');
const PORT = process.env.PORT;
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors(server.corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const libroRouter = require('./routers/libros/libroRouter');
app.use("/libros", libroRouter);
 
const autorRouter = require('./routers/autores/autorRouter');
app.use("/autores", autorRouter);

const userRouter = require('./routers/users/userRouter');
app.use("/users", userRouter); 

const imgRouter = require('./routers/img/imgRouter');
app.use("/img", imgRouter);

const prestamosRouter = require('./routers/prestamos/prestamosRouter');
app.use("/prestamos", prestamosRouter);

/*
PRACTICAS Y EXAMENES

const datosRouter = require('./routers/datosRouter');
app.use("/", datosRouter);

const examen2Router = require('./routers/examen2Router');
app.use("/", examen2Router);
*/ 

app.listen(PORT, () => {
    console.log("Server initialized on PORT: " + PORT);
});   