import http from "http";
import express from "./services/express";
import routes from "./routes";
import mongoose, { ConnectOptions } from "mongoose";
import { ServerApiVersion } from "mongodb";
import dbconfig from "./config/db.config";
const path = require("path");

mongoose
  .connect(dbconfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  } as ConnectOptions)
  .then((db) => {
    console.log("database is connected");
  })
  .catch((err) => console.log(err));

const app = express(routes);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/public", "index.html"));
});

const server = http.createServer(app);
server.listen(3500, () => {
  console.log("Server is running on port 5000");
});
