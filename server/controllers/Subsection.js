const SubSection=require("../models/Subsection")
const Section=require("../models/Section")
const {uploadImageCloudinary}=  require('../utils/uploadImageCloudinary');
const Subsection = require("../models/Subsection");

exports.CreateSubSection=async (req,res)=>{
    try{
        const {sectionId,title,timeDuration,description}=req.body;
        const videoFile =req.file.videoFile;

        //validation subsection fields
        if(!title || !timeDuration || description || !videoFile){
            return res.status(404).json({
                sucess :false,
                message:"all fields required"
            })
        }

        //upload video cloudinary
        const uploadDetail  = await uploadImageCloudinary(videoFile , process.env.FOLDER_NAME);

        //create sub-section
        const newSubsection=await Subsection.create({title,timeDuration,description,videoUrl:uploadDetail.secure_url})

        //update section
        const updatesection=await SubSection.findByIdAndUpdate({_id:sectionId},{$push:{subsection: newSubsection._id}} ,{new:true});
        return res.status(200).json({
            sucess:true,
            message:"sucessfully created sub-section"
        })

    }catch(error){
        return res.status(500).json({
            sucess:false,
            error: `error occures at  sub section ${error.message}`,
        })
    }
}

exports.DeleteSubSection=async(req,res)=>{
    try{
        const {subSectionId,sectionId} = req.body;
        

        await SubSection.findByIdAndDelete({subSectionId});

        //also delete from section
        const parentSection = await Section.findByIdAndUpdate(
            subsectionToDelete.parentSection,
            { $pull: { subsections: subSectionId } },
            { new: true }
          );
        return res.status(200).json({
            sucess:true,
            message:"sucessfully deleted subsection"
        })
    }catch(error){
        return res.status(500).json({
            sucess:false,
            error: `error occures at  sub section ${error.message}`,
        })
    }
}


exports.UpdateSubSection = async (req, res) => {
    try {
      const { subSectionId } = req.params; // Assuming you pass the subSectionId as a URL parameter
      const { title, timeDuration, description } = req.body;
  
      // Check if the subSectionId is valid
      const existingSubsection = await SubSection.findById(subSectionId);
  
      if (!existingSubsection) {
        return res.status(404).json({
          success: false,
          message: "Subsection not found"
        });
      }
  
      // Create an update object with the fields you want to update
      const updateFields = {};
  
      if (title) {
        updateFields.title = title;
      }
  
      if (timeDuration) {
        updateFields.timeDuration = timeDuration;
      }
  
      if (description) {
        updateFields.description = description;
      }
  
      // Update the subsection
      const updatedSubsection = await SubSection.findByIdAndUpdate(
        subSectionId,
        updateFields,
        { new: true }
      );
  
      return res.status(200).json({
        success: true,
        message: "Successfully updated subsection",
        subsection: updatedSubsection
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: `Error occurred while updating subsection: ${error.message}`
      });
    }
  };
  


