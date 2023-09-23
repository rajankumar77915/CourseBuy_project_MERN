const Category = require("../models/Category");


exports.createCategory = async (req, res) => {
	try {
		const { name, description } = req.body;
		if (!name) {
			return res
				.status(400)
				.json({ success: false, message: "All fields are required" });
		}
		const CategorysDetails = await Category.create({
			name: name,
			description: description,
		});
		return res.status(200).json({
			success: true,
			message: "Categorys Created Successfully",
		});
	} catch (error) {
		return res.status(500).json({
			success: true,
			message: error.message,
		});
	}
};

exports.showAllCategories = async (req, res) => {
	try {
		const allCategorys = await Category.find(
			{},
			{ name: true, description: true }
		);
		res.status(200).json({
			success: true,
			data: allCategorys,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
// mostPopular , top selling etc course page view
exports.categoryPageDetails = async (req, res) => {

    try{
    //get categoryId
    const { categoryId } = req.body;
    // get Courses for specified courseID
    const selectedCategory = await Category.findById({ _id:categoryId }).populate({ path: "course", select: "studentEnrolled" }).exec();
    console.log("----------------------------------------------")
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
    const topSellingCourse = await Category.aggregate([
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
        {
            $lookup: {
                from: "courses", // Replace with the actual name of your "courses" collection
                localField: "course", // Field in the current collection
                foreignField: "_id",   // Field in the "courses" collection
                as: "courseData"       // Alias for the joined data
            }
        },
        {
            $unwind: "$courseData"
        },
        {
            $project: {
                "course.instructor": "$courseData.instructor",
                "course.ratingAndReview": "$courseData.ratingAndReview",
                "course.studentEnrolled": "$courseData.studentEnrolled"
            }
        }
    ]).exec();
    

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