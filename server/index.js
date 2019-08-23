require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");
const { login, logout, register } = require("./auth_controller");
const { getPosts } = require("./post_controller");
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;

const app = express();

app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("Database Connected B-)");
});

//Auth Endpoints
app.post("/api/login", login);
app.post("/api/register", register);
app.get("/api/logout", logout);

//Posts Enpoints
app.get("/api/posts", getPosts);

app.listen(SERVER_PORT, () => console.log("Connected on port " + SERVER_PORT));
