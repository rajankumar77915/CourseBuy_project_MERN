const { default: mongoose } = require("mongoose");

const SectionSchema = new mongoose.Schema({
    sectionName: {
        type: String
    },
    subsection: [{
        type:mongoose.Types.ObjectId,
        ref:"Subsection"
    }]
})

module.exports = mongoose.model("Section", SectionSchema);