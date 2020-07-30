require("dotenv").config();
require("./config/dbConnection");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");

// dependencies injection
const session = require("express-session"); //sessions make data persist between http calls
const passport = require("passport"); // auth library (needs sessions)

const app = express();

app.use(logger("dev"));

app.use(express.json());

app.use(
  session({
    cookie: { secure: false, maxAge: 4 * 60 * 60 * 1000 }, // 4 hours
    resave: true,
    saveUninitialized: true,
    secret: process.env.SECRET_SESSION,
  })
);

const corsOptions = {
  origin: [process.env.FRONTEND_URI, process.env.FRONTEND_URL_SECURE],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URI);
//   // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/sheet", require("./routes/gsheet"));

app.use("/email", require("./routes/email"));

module.exports = app;
