const Cloudinary = require("cloudinary").v2

exports.cloudinaryConnect = (() => {
    try {
        Cloudinary.config({
            cloud_name: "dmgbqv6uz",
            api_key: "395245916267259",
            api_secret: "GdEJc1NtSGj-pKZnKZ42juA5CzY"
        })
        
        console.log("connection with cloudinary sucess")
    } catch (error) {
        console.log("cloudinary unsucess connection")
        console.log(error.message)
    }
}
)