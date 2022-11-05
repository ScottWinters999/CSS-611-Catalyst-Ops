const express = require("express");
const app = express();
const db = require("./models");
const routes = require("./routes/signup");
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });
app.use(cors());

// app.use(express.static(path.join('public')))
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: "Post added successfully",
  });
});

app.use("/upload/images", express.static(path.join("uploads", "images")));

app.use(bodyParser.urlencoded({ extended: false }));
(async () => {
  await db.sequelize.sync();
})();

// process.env./

app.use("/api", routes);

// app.use( (req,res,next)=>{
//     res.sendFile(path.resolve(__dirname,'public','index.html'));
// })

//const server=app.listen(5000);
const httpserver = http.createServer(app);
// console.log(__dirname)
// dotenv.config({path:__dirname+'/.env'});
const io = new Server(httpserver, {
  cors: {
    origin: "http://localhost:3000",
    method: ["GET", "POST"],
    transports: ["websocket"],
  },
});
const messageData = {
  room: "123",
  author: "caty",
  message: "new_message",
  time:
    new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
};
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join("123");
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });
  console.log(socket.id);
  socket.on("send_message", (data) => {
    socket.emit("receive_message", messageData);
  });
  socket.on("disconnect", () => {
    console.log("disconnected", socket.id);
  });
});
httpserver.listen(5000, () => {
  console.log("SERVER RUNNING");
});
