import userModel from "../models/userModel.js";  // Make sure this is correctly imported

export const getUserData = async (req, res) => {
    const userId = req.userId;  // Get the user ID from the request object

    if (!userId) {
        return res.json({ success: false, message: 'User ID is required' });
    }

    try {
        const user = await userModel.findById(userId);  // Find the user by their ID

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        res.json({
            success: true,
            userData: {
                name: user.name,
                isAccountVerified: user.isAccountVerified
            }
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
