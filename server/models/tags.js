const { default: mongoose } = require("mongoose");

const TagsSchema=new mongoose.Schema({
   name:{
    type:String,
    require:true
   },
   decribtion:{
    type:String
   },
   course:{
    type:mongoose.Schema.Types.ObjectId ,
    ref:"Course"
   }

})

module.exports=mongoose.model("Tags",TagsSchema);