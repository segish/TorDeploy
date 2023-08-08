const mongoose= require("mongoose")

const CourseSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    category:{
        type:String,
    },
    instructor:{
        type:String,
    },
    descreption:{
        type:String,
    },
    type:{
        type:String,
        default:"free"
    },
    banner: {
        type: String,
    },
    section:[{
        title:String,
        type:{
            type:String,
            default:"free"
        },
        descreption:String,
        youtubeLink:String,
    }],
},
{timestamps: true},
);

module.exports = mongoose.model("Course",CourseSchema);