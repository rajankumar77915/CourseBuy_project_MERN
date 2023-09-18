const { default: mongoose } = require("mongoose");

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
        trim:true
    },
    lastName:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true
    },
    password:{
        type:String,
        require:true,
    },
    accountType:{
        type:String,
        enum:["Admin","Student","Instructor"],
        require:true,
    },
    additionalDetails:{
        type:mongoose.Schema.ObjectId,
        require:true,
        ref:"Profile"
    },

    Courses:[{
        type:mongoose.Schema.ObjectId,
        ref:"Course"
    }],
    image:{
        type:String,
        require:true
    },
    CourseProgress:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CourseProgress"
    }],
    token:{
        type:String
    },
    resetPasswordExpires:{
        type:Date
    }
})


module.exports=mongoose.model("User",userSchema);


