const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const mailgen = require("mailgen");
const dotenv = require("dotenv");
dotenv.config();

var savedOTPs = {};
var savedOTPsForgot = {};

const Register = async (req, res) => {
    try {
        if (req.body.otp.localeCompare(savedOTPs[req.body.email])) {
            return res.status(404).json("incorect OTP")
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPssword = await bcrypt.hash(req.body.password, salt);
        //create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPssword,
            name: req.body.name,
        });

        //save and respond 
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json("somthing went wrong!")
    }
}

//sending OTP to verify email address
const Otp = (req, res) => {
    var otp = Math.floor(1000 + Math.random() * 9000);
    const { name, email } = req.body;
    let config = {
        service: 'gmail',
        auth: {
            user: 'tsegatigneh08@gmail.com',
            pass: 'rdolmbzcjbdyxcoj'
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new mailgen({
        theme: "default",
        product: {
            name: "Mailgen",
            link: 'https://mailgen.js/'
        }
    })

    let response = {
        body: {
            name: name,
            intro: "your OTP has arrived ",
            table: {
                data: [
                    {
                        One_Time_password: "Enter the OTP: " + otp + " on your browser and register OTP will expire after 10 minuets",
                    }
                ]
            },
            outro: "waiting to be verified!!"
        }
    }

    let mail = MailGenerator.generate(response);

    let message = {
        from: 'tsegatigneh08@gmail.com',
        to: email,
        subject: "one time password",
        html: mail
    }
    transporter.sendMail(message).then(() => {
        savedOTPs[email] = otp;
        setTimeout(() => {
            delete savedOTPs[email];
        }, 600000);
        return res.status(200).json("OTP has been sent to your email");
    }).catch(err => {
        return res.status(500).json("something went wrong!");
    })
}

//login
const Login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json("Incorrect email or password");
        const validPssword = await bcrypt.compare(req.body.password, user.password)
        if (!validPssword) return res.status(400).json("Incorrect email or password")

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRETE_KEY, {
            expiresIn: "2d"
        });  //temporary secrete key

        const { password, updatedAt, ...others } = user._doc;

        res.cookie("accessToken", token, {
            expires: new Date(Date.now() + 1000 * 60 * 2880),  //to expire after 35 minutes
            httpOnly: true,
        }).status(200).json(others);
    } catch (err) {
        res.status(500).json("somthing went wrong!")
    }
}

//logout
const Logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("user has been loged out")
}



//sending OTP to forgot password
const Forgot = async (req, res) => {
    const email = req.body.email;
    let oldUser;
    try {
        oldUser = await User.findOne({ email: email });
        if (!oldUser) {
            return res.status(404).json("user dosent exist");
        }
    } catch (error) {
        console.log("somthing went wrong")
    }
    var otp = Math.floor(1000 + Math.random() * 9000);
    let config = {
        service: 'gmail',
        auth: {
            user: 'tsegatigneh08@gmail.com',
            pass: 'rdolmbzcjbdyxcoj'
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new mailgen({
        theme: "default",
        product: {
            name: "Mailgen",
            link: 'https://mailgen.js/'
        }
    })

    let response = {
        body: {
            name: oldUser.firstName,
            intro: "your OTP has arrived ",
            table: {
                data: [
                    {
                        One_Time_password: "Enter the OTP: " + otp + " on your browser and reset your password OTP will expire after 10 minuets",
                    }
                ]
            },
            outro: "waiting to be reseted!!"
        }
    }

    let mail = MailGenerator.generate(response);

    let message = {
        from: 'tsegatigneh08@gmail.com',
        to: email,
        subject: "one time password",
        html: mail
    }
    transporter.sendMail(message).then(() => {
        savedOTPsForgot[email] = otp;
        setTimeout(() => {
            delete savedOTPsForgot[email];
        }, 600000);
        return res.status(200).json("OTP has been sent to your email");
    }).catch(err => {
        return res.status(500).json("something went wrong!");
    })
}

//reset the old password
const ResetPassword = async (req, res) => {
    const { email, otp, password, coniform_password } = req.body;
    try {
        if (otp.localeCompare(savedOTPsForgot[email])) {
            return res.status(404).json("incorect OTP")
        }
        if (password !== coniform_password)
            return res.status(403).json("password must be the same")
        const oldUser = await User.findOne({ email: email });
        if (!oldUser) {
            return res.status(404).json("user dosent exist");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPssword = await bcrypt.hash(password, salt);
        
        await oldUser.updateOne({$set: {password: hashedPssword}})

        res.status(200).json("password has changed succesfully");

    } catch (err) {
        res.status(200).json("something went wrong");
    }
}
module.exports = { Register, Otp, Login, Logout, Forgot, ResetPassword };