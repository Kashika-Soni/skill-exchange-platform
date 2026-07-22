const User = require("../models/User");

const getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id).select("-password");

        res.json({
            success: true,
            user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

const updateProfile = async (req, res) => {

    try {

        const {
            name,
            skillsToTeach,
            skillsToLearn
        } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            {
                name,
                skillsToTeach,
                skillsToLearn
            },
            {
                new: true
            }
        ).select("-password");

        res.json({
            success: true,
            message: "Profile Updated Successfully",
            user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

module.exports = {
    getProfile,
    updateProfile
};