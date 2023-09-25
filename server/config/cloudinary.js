const Cloudinary = require("cloudinary").v2

exports.cloudinaryConnect = (() => {
    try {
        Cloudinary.config({
            cloud_name: "",
            api_key: "",
            api_secret: ""
        })
        
        console.log("connection with cloudinary sucess")
    } catch (error) {
        console.log("cloudinary unsucess connection")
        console.log(error.message)
    }
}
)
