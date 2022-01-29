const express = require("express");
const app = express();
const path = require("path");

app.set("port", process.env.port || 3000);

//static files-> se cargan en el navegador
app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(app.get("port"), () => {
  console.log(`Server running in port ` + app.get("port"));
});

const socketIO = require("socket.io");
const io = socketIO(server); //server inicializado

//websockets
io.on("connection", (socket) => {
  console.log("new connection", socket.id);

  socket.on("chat:typing", (user) => {
      //enviamos el nombre de usuario a todos exepto a quien emite, por eso el broadcast
    socket.broadcast.emit("chat:user-typing", user);
  });

  socket.on("chat:message", (data) => {
    //reenviamos a todos los navs para que vean
    io.sockets.emit("chat:messages", data);
  });
});
