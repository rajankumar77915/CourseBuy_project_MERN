
const Category = require("../models/Category");
// mostPopular , top selling etc course page view
exports.categoryPageDetails = async (req, res) => {

    try{
    //get categoryId
    const { categoryId } = req.body;
    // get Courses for specified courseID
    const selectedCategory = await Category.findById({ categoryId }).populate({ path: "course", select: "studentEnrolled" }).exec();
    // validation
    if (!selectedCategory) {
        return res.status(404).json({
            sucess: true,
            message: "category not found"
        })
    }

    // get corses diffrent courses
    const differentCategory = await Category.find({
        _id: { $ne: categoryId },
    }).populate("course").exec();
    // get top 10 selling courses
    const topSellingCourse = await Category.aggregate(
        {
            $match: { _id: categoryId }
        },
        {
            $unwind: "$course"
        },
        {
            $sort: { "course.studentEnrolled": -1 }
        },
        {
            $limit: 10
        },
    ).populate({ path: "course", select: "instructor ratingAndReview studentEnrolled" }).exec();

    return res.status(200).json({
        status:true,
        
        data:selectedCategory,differentCategory,topSellingCourse
    })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            status:false,
            message:`error at categoryPageDetail ${error.message}`
        })
    }
}