require('dotenv').config();
const { server } = require('./utils/config.json');
const PORT = process.env.PORT;
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Middleware
const corsOptions = {
    origin: (origin, callback) => {
        if (server.corsOptions.origin.includes(origin) || !origin) {
            callback(null, true); 
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: server.corsOptions.methods,
    preflightContinue: server.corsOptions.preflightContinue,
    optionsSuccessStatus: server.corsOptions.optionsSuccessStatus,
    allowedHeaders: server.corsOptions.allowedHeaders,
    credentials: server.corsOptions.credentials
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

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

const multasRouter = require('./routers/multas/multasRouter');
app.use("/multas", multasRouter);

const paypalRouter = require('./routers/paypal/paypalRouter');
app.use("/paypal", paypalRouter);

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