const express = require("express");
const chats = require("./data/data");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandling } = require("./middleware/errormiddleware");
// connectDB();
dotenv.config();
connectDB();

const app = express();

app.use(express.json()); //to accept json data

// app.get('/api/chats',(req,res) => {
//     res.send(chats);
// })

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

const path = require("path");

//---------------Deployment----------------
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    //request and response
    res.send("API is running successfully");
  });
}

//-----------------------------------------

app.use(notFound);
app.use(errorHandling);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server started on port ${PORT}`));

const BASE_URL = process.env.BASE_URL;

// //origin: "http://localhost:3000",
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    //origin: "*",
    //credentials: true,
    origin: `${BASE_URL}`,
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined room :" + room);
  });

  socket.on("typing", (room) => {
    socket.in(room).emit("typing");
  });

  socket.on("stop typing", (room) => {
    socket.in(room).emit("stop typing");
  });

  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chat;
    if (!chat.users) return console.log("chat.users is not defined.");

    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) return;

      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });

  socket.off("setup", () => {
    console.log("User disconnected.");
    socket.leave(userData._id);
  });
});
