const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
//importacion mongoose y el conector
const passport = require("./passport/setup");
const auth = require("./routes/auth");
require('dotenv').config()
// .env

const app = express();
var PORT = process.env.PORT ;
const MONGO_URI = "mongodb+srv://msebass:KMFedy94@cluster0.hghwl.mongodb.net/kuepa?retryWrites=true&w=majority";

mongoose
    .connect(MONGO_URI, { useNewUrlParser: true , useUnifiedTopology: true})
    .then(console.log(`MongoDB conectada ${MONGO_URI}`))
    .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// session
app.use(
    session({
        secret: "secretooooooo",
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
);

// passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", auth);
app.get("/", (req, res) => res.send("Corriendo :)"));

app.listen(PORT, () => console.log(`Backend corriendo on el puerto ${PORT}!`));
