const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

//express server setup

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    })
);
app.use(cookieParser());

app.listen(4000, () => console.log("Server started on port 4000"));

//router setup

app.use("/snippit", require("./routers/snippitRouter"));
app.use("/auth", require("./routers/userRouter"));

//connect to mongodb

mongoose.connect(process.env.MDB_CONNECT_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) return console.error(err);
    console.log("Connected to Mongodb");
});