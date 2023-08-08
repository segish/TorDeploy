const mongoose= require("mongoose")

const AdminSchema = new mongoose.Schema({
    AdminName:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    }
},
{timestamps: true},
);

module.exports = mongoose.model("Admin",AdminSchema);