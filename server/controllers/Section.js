const Section = require("../models/Section")
const Course = require("../models/Course")
exports.CreateSection = async (req, res) => {
    try {
        const { sectionName, courseId } = req.body;
        if (!sectionName) {
            return res.status(404).json({
                sucess: false,
                message: "sectionName  or courseid requires"
            })
        }
        //store in Section db
        const SectionDetail = await Section.create({ sectionName })
        if (!SectionDetail) {
            return res.status(404).json({
                sucess: false,
                message: "Section detais are not found"
            })
        }
        console.log("SectionDetail:", SectionDetail);
        //store this Section into Course db
        const CourseDetail = await Course.findByIdAndUpdate({ _id: courseId }, { $push: { courseContent: SectionDetail } }, { new: true }).populate();
        if (!CourseDetail) {
            return res.status(404).json({
                sucess: false,
                message: "CourseDetail detais are not found"
            })
        }
        console.log("course details:", CourseDetail);
        res.status(200).json({
            sucess: true,
            message: "sucessfully added section"
        })


    } catch (error) {
        res.status(500).json({
            sucess: false,
            error: `error occures at Section cretation ${error.message}`,
        })
    }
}

exports.UpdateSection = async (req, res) => {
    try {
        //fetch
        const { sectionName, sectionId } = req.body;
        if (!sectionName || !sectionId) {
            return res.status(404).json({
                sucess: false,
                message: "sectionName or sectionId requires"
            })
        }

        const UpdatedSection = await Section.findByIdAndUpdate({ sectionId }, { sectionName });

        return res.status(200).json({
            status: true,
            message: "updated sucessfully"
        })
    } catch (error) {
        res.status(500).json({
            sucess: false,
            error: `error occures at Section updation ${error.message}`,
        })
    }
}

exports.DeleteSection = async (req, res) => {
    try {
        const {sectionId}=req.body;

        await Section.findByIdAndDelete({sectionId});
    } catch (error) {
        res.status(500).json({
            sucess: false,
            error: `error occures at Section updation ${error.message}`,
        })
    }

}