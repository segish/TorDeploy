const mongoose= require("mongoose")

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:3,
        max:20,
    },
    email:{
        type:String,
        require:true,
        max:50,
    },
    password:{
        type:String,
        require:true,
        min:6,
    },
    firstName:{
        type:String,
        max:50,
    },
    lastName:{
        type:String,
        max:50,
    },
    phone:{
        type:String,
        max:50,
    },
    paymentStatus:{
        type:String,
        default:"free",
    },
},
    {timestamps:true}
    );

module.exports = mongoose.model("User",UserSchema);