const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin")
const dotenv = require("dotenv");
dotenv.config();
//add admin

const addAdmin = async (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You must login first!");

    jwt.verify(token, process.env.JWT_SECRETE_KEY, async (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        try {
            const currentUser = await Admin.findById(userInfo.id);
            if (!currentUser) return res.status(403).json("only admin can add admin")
            const salt = await bcrypt.genSalt(10);
            const hashedPssword = await bcrypt.hash(req.body.password, salt);
            //create new admin
            const newUser = new Admin({
                adminName: req.body.adminName,
                email: req.body.email,
                password: hashedPssword,
            });

            //save and respond 
            const admin = await newUser.save();
            res.status(200).json(admin);
        } catch (err) {
            res.status(500).json("somthing went wrong!")
        }
    })
}

//login

const login = async (req, res) => {
    try {
        const admin = await Admin.findOne({ email: req.body.email });
        if (!admin) return res.status(404).json("Incorect emiail or password");
        const validPssword = await bcrypt.compare(req.body.password, admin.password)
        if (!validPssword) return res.status(400).json("Incorect emiail or password")
        const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRETE_KEY, {
            expiresIn: "1d"
        });  //temporary secrete key
        const { password, updatedAt, adminName, email, ...others } = admin._doc;

        res.cookie("accessToken", token, {
            expires: new Date(Date.now() + 1000 * 60 * 1440),  //to expire after 30 minutes
            httpOnly: true,
        }).status(200).json(others);
    } catch (err) {
        res.status(500).json("somthing went wrong!")
    }
}

//logout
const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("user has been loged out")
}


//change password

const changePwd = async (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You must login first!");

    jwt.verify(token, process.env.JWT_SECRETE_KEY, async (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        try {
            const currentUser = await Admin.findById(userInfo.id);
            if (!currentUser) return res.status(403).json("only admin can add admin")

            const { oldPassword, newPassword } = req.body
            const validPssword = await bcrypt.compare(oldPassword, currentUser.password)
            if(!validPssword) return res.status(401).json("Incorrect password!")

            const salt = await bcrypt.genSalt(10);
            const hashedPssword = await bcrypt.hash(newPassword, salt);

            currentUser.password = hashedPssword

            await currentUser.save()

            return res.status(200).json("passwored change success")
            
        } catch (err) {
            return res.status(500).json("Somthing went wrong")
        }
    })

}

//refresh user

const getAdmin = async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You must login first!");

    jwt.verify(token, process.env.JWT_SECRETE_KEY, async (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        try {
            const user = await Admin.findById(userInfo.id);
            if (!user) return res.status(403).json("No account found!");
            const { password, updatedAt, adminName, email, ...others } = user._doc;
            res.status(200).json(others);
        } catch (err) {
            return res.status(500).json("somthing went wrong!");
        }
    });
}

module.exports = { addAdmin, login, logout, getAdmin, changePwd };
