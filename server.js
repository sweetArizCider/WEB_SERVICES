const express = require('express');
const { server } = require('./utils/config.json');
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

/*
PRACTICAS Y EXAMENES

const datosRouter = require('./routers/datosRouter');
app.use("/", datosRouter);

const examen2Router = require('./routers/examen2Router');
app.use("/", examen2Router);
*/ 

app.listen(server.port, () => {
    console.log("Server initialized on PORT: " + server.port);
});   