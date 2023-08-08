const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require ("cors");
const authRouter = require("./routes/Auth");
const courseRouter = require("./routes/Courses");
const InstructorRouter = require("./routes/Instructors");
const UserRouter = require("./routes/Users");
const cookieParser = require("cookie-parser");

dotenv.config();
mongoose.connect(process.env.MONGO_URL,{ 
    useNewUrlParser: true, useUnifiedTopology: true 
},).then(()=>console.log("Connected to MongoDB"))
.catch((err)=>{console.log(" can't Connect to MongDB because of =>"+err)})

//midleware
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.use(helmet());
app.use(morgan("common"));
app.set("view engine","ejs");
app.use(express.static('views'));
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(
    cors({
        origin: "http://localhost:3000",
    })
);

//routs
app.use("/api/users", UserRouter)
app.use("/api/auth", authRouter)
app.use("/api/courses", courseRouter)
app.use("/api/instrutcors", InstructorRouter)

app.listen(8800, () => {
    console.log("Backend server is running!");
  });