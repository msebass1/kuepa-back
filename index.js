const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
//importacion mongoose y el conector
const passport = require("./passport/setup");
const auth = require("./routes/auth");
const cors = require("cors");
require('dotenv').config();
// .env

const app = express();
app.use(cors());
//cors

const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server, {
  cors: {
    origin: '*',
  }
});


// -----------------Socket io - modelo mensajes--------------------
const Message = require("./models/Messages");
io.on("connection", socket => {
  socket.emit('tu id es', socket.id);
  socket.on('send message', (body) => {
    const newMessage = new Message(body);
    io.emit('message',body)
    newMessage.save()
  })
})

// socket io


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

server.listen(PORT, ()=>console.log(`Backend corriendo on el puerto ${PORT}!`));
