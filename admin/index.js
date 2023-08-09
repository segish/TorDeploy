const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const bodypaser = require("body-parser");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const courseRouter = require("./routes/Courses");
const InstructorRouter = require("./routes/Instructors");
const cookieParser = require("cookie-parser");

dotenv.config();
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
},).then(() => console.log("Connected to MongoDB"))
    .catch((err) => { console.log(" can't Connecte to MongDB because of =>" + err) })

//midleware
app.use(bodypaser.json({ limit: '50mb' }));
app.use(bodypaser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(helmet());
app.use(morgan("common"));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(
    cors({
        origin: "http://admin.94.130.104.15",
    })
);

//routs
app.use("/api/users", userRouter)
app.use("/api/auth", authRouter)
app.use("/api/courses", courseRouter)
app.use("/api/instructors", InstructorRouter)

app.listen(8000, () => {
    console.log("Admin backend server is running!");
});