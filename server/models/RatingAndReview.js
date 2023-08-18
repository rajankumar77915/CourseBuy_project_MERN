const { default: mongoose } = require("mongoose");

const RatingAndReviewSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User"
    },
    rating:{
        type:Number,
        require:true
    },
    review:{
        type:String,
        trime:true
    }

})

module.exports=mongoose.model("RatingAndReview",RatingAndReviewSchema);