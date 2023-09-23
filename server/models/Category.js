//only admin can add the tag/category

const { default: mongoose } = require("mongoose");

const CategorySchema=new mongoose.Schema({
   name:{
    type:String,
    require:true
   },
   description:{
    type:String
   },
   course: [{
    type:mongoose.Schema.Types.ObjectId ,
    ref:"Course"
   }]

})

module.exports=mongoose.model("Category",CategorySchema);