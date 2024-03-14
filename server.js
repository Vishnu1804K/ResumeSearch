const express = require("express");
const dotenv = require('dotenv');
dotenv.config();
const app = express();

const dbConnect = require("./dbConnect");
app.use(express.json());
const port = 5000;
const userRoute = require("./routes/userRoute");
const commentRoute = require("./routes/commentRoute");

const path = require("path");
const cors = require("cors");
app.use(cors());


app.use("/api/user/", userRoute);
app.use("/api/comments", commentRoute);

app.listen(port, () => console.log(`Resume Builder app listening on port ${port}!`));
