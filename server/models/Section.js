const { default: mongoose } = require("mongoose");

const SectionSchema = new mongoose.Schema({
    sectionName: {
        type: String
    },
    SubSection: [{
        type:mongoose.Types.ObjectId,
        ref:"SubSection"
    }]
})

module.exports = mongoose.model("Section", SectionSchema);