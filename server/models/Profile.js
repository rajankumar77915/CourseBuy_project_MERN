const { default: mongoose } = require("mongoose");

const ProfileSchema=new mongoose.Schema({
    gender:{    
        type:string                                                                                                        
    },
    DOB:{ 
        type:Date                   
    },
    about:{
        type:string,
        trime:true
    },
    contactNumber:{
        type :string,   
        trime:true
    }
})

module.exports=mongoose.model("Profile",ProfileSchema);