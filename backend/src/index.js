require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.use(express.json());

// APP ROUTES
//////////////////////////////////////////////////////////////////////////////
const loginRoute = require("./routes/login.route");
const userRoute = require("./routes/user.route");

app.use("/", loginRoute); // home
app.use("/", userRoute); // user (user table)

// APP START
//////////////////////////////////////////////////////////////////////////////
app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}!`)
);