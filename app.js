require("dotenv").config()
const express = require("express")
const MongoStore = require('connect-mongo');
const session = require("express-session")

require("express-async-errors")

const cors = require("cors")

const connectDB = require("./db/connection");
const passport = require("passport");

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const ErrorHandlerMiddleware = require("./middlewares/errorHandler")

require("./passport")

app.use(cors())

app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: true, // create session even if something is not stored
    resave: false, //don't save session if unmodified
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: "sessions"
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    }
}));


app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    console.log(req.session);
    console.log(req.user);
    next();
});


//routes
const authRoute = require("./routes/auth")
app.use('/', authRoute)


//middleware
const notFoundMiddleware = require("./middlewares/notFound")
app.use(notFoundMiddleware)

app.use(ErrorHandlerMiddleware)


let PORT = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, (() => console.log(`Server listening at port ${PORT}`)))
    } catch (err) {
        console.log(err);
    }
}

start()