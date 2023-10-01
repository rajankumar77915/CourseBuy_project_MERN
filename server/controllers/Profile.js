const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageCloudinary } = require("../utils/uploadImageCloudinary");
// Method for updating a profile
exports.updateProfile = async (req, res) => {
	try {
		const { DOB = "", about = "", gender = "", contactNumber } = req.body;
		const id = req.user.id;
		const { firstName, lastName } = req.body;

		// Find the profile by id
		const userDetails = await User.findById(id);
		const profile = await Profile.findById(userDetails.additionalDetails);

		const updateFields = {}; // Initialize an empty object for the update

		if (firstName !== undefined && firstName !== '') {
			updateFields.firstName = firstName;
		}

		if (lastName !== undefined && lastName !== '') {
			updateFields.lastName = lastName;
		}

		if (Object.keys(updateFields).length > 0) {
			// Only perform the update if there are fields to update
			await userDetails.updateOne({ $set: updateFields });
		}

		// Update the profile fields
		profile.DOB = Date(DOB);
		profile.about = about;
		profile.contactNumber = contactNumber;
		profile.gender = gender

		// Save the updated profile
		await profile.save();
		
		const Updatedprofile=await User.findById( id ).populate("additionalDetails");
		Updatedprofile.password='';
		Updatedprofile.resetPasswordExpires=''
		console.log("Updateprofile  ",Updatedprofile)
		return res.status(200).json({
			success: true,
			message: "Profile updated successfully",
			Updatedprofile,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			error: `error at update profil:${error.message}`,
		});
	}
};

exports.deleteAccount = async (req, res) => {
	try {

		const id = req.user.id;
		const user = await User.findById(id);
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}
		// Delete Assosiated Profile with the User
		await Profile.findByIdAndDelete({ _id: user.additionalDetails.toString() });
		// TODO: Unenroll User From All the Enrolled Courses
		// Now Delete User
		await User.deleteOne({ _id: id });
		res.status(200).json({
			success: true,
			message: "User deleted successfully",
		});
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ success: false, message: "User Cannot be deleted successfully" });
	}
};

exports.getAllUserDetails = async (req, res) => {
	try {
		const id = req.user.id;
		const userDetails = await User.findById(id)
			.populate("additionalDetails")
			.exec();
		console.log(userDetails);
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.updateDisplayPicture = async (req, res) => {
	try {
		console.log("------------------")
		console.log(req.files)
		const displayPicture = req.files.displayPicture
		const userId = req.user.id
		const image = await uploadImageCloudinary(
			displayPicture,
			process.env.FOLDER_NAME,
			1000,
			1000
		)
		console.log("afetr::::::::::::", image)
		const updatedProfile = await User.findByIdAndUpdate(
			{ _id: userId },
			{ image: image.secure_url },
			{ new: true }
		)
		res.send({
			success: true,
			message: `Image Updated successfully`,
			data: updatedProfile,
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		})
	}
};

exports.getEnrolledCourses = async (req, res) => {
	try {
		const userId = req.user.id
		const userDetails = await User.findOne({
			_id: userId,
		})
			.populate("courses")
			.exec()
		if (!userDetails) {
			return res.status(400).json({
				success: false,
				message: `Could not find user with id: ${userDetails}`,
			})
		}
		return res.status(200).json({
			success: true,
			data: userDetails.courses,
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		})
	}
};