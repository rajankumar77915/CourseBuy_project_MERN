const { default: mongoose } = require("mongoose");

const ProfileSchema=new mongoose.Schema({
    gender:{    
        type:String                                                                                                        
    },
    DOB:{ 
        type:Date                   
    },
    about:{
        type:String,
        trime:true
    },
    contactNumber:{
        type :String,   
        trime:true
    }
})

module.exports=mongoose.model("Profile",ProfileSchema);