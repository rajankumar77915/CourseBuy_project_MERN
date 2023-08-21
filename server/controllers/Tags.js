const mongoose = require("mongoose")
const Tag = require("../models/tags")
// const Valida
exports.createTag = async (req, res) => {


    try {
        const { name, decribtion } = req.body;

        if(!name || !decribtion){
            return res.status(400).json({
                success: false,
                message: "require all field",
                data: addedTag,
            })
        }
        //const addedTag=await Tag.create({name:name,decribtion:decribtion})
        const tagObj = Tag({ name, decribtion });
        const addedTag = await tagObj.save();

        console.log("TagDetails:",addedTag);
        res.status(200).json({
            success: true,
            message: "sucessfully created tag",
        })

    }
    catch (err) {
        console.log(`error ocuures when creating tag:${err.message}`)
        res.status(500).json(
            {
                success: true,
                message: `error ocuures when creating tag:${err.message}`
            }
        );
    }
}

exports.getAllTags=async(req,res)=>{
    try{
        const allTags=Tag.find({},{name:true,decribtion:true});
        res.status(200).json({
            success: true,
            message: "sucessfully return all tags",
        })
    }catch(error){
        console.log(`error ocuures at  getAllTags:${err.message}`)
        res.status(500).json(
            {
                success: true,
                message: `error ocuures at getAlltags:${err.message}`
            }
        );
    }
}