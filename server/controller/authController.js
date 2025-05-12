import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../configs/nodemailer.js';
import { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE } from '../configs/emailTemplate.js';

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({ success: false, message: 'Missing details' });
    }

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({ name, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        

        // Send welcome email 

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to Dev mak site',
            text: `Welcome to dev mak website, Your account has been created sucessfully. Your email is ${email}`
        }

        await transporter.sendMail(mailOptions)

        return res.json({ success: true, message: 'User registered successfully' });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: 'Email and password are required' });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'Invalid email' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({ success: true, message: 'Logged in successfully' });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const logout = (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
        });

        return res.json({ success: true, message: 'Logged out successfully' });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};


export const sendVerifyOtp = async (req, res) => {
    try {
        const userId = req.userId; // ✅ use the userId attached in middleware

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.isAccountVerified) {
            return res.status(400).json({ success: false, message: "Account already verified" });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 5 * 60 * 1000; // 5 minutes

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account verification OTP',
            // text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
            html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}",user.email)
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ success: true, message: "OTP sent successfully" });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};



export const verifyEmail = async (req, res) => {
    const userId = req.userId; // ✅ from middleware
    const { otp } = req.body;

    if (!userId || !otp) {
        return res.json({ success: false, message: "Missing details" });
    }

    try {
        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.json({ success: false, message: "Invalid OTP" });
        }

        if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: "OTP expired" });
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save();
        return res.json({ success: true, message: "Email verified successfully" });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};


export const isAuthenticated = async (req, res) => {
    try {
        return res.json({success:true})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

//send reset password otp

export const sendResetOtp = async (req, res) => {
    const { email } = req.body;

    // Check if email is provided
    if (!email) {
        return res.json({ success: false, message: "Email is required" });
    }

    try {
        // Find the user with the provided email
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // Generate OTP and set the expiration time (15 minutes)
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000; // 15 minutes

        // Save the user with the new OTP
        await user.save();

        // Prepare the email with the OTP
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password reset OTP',
            // text: `Your OTP for resetting password is ${otp}. Use this OTP to proceed with resetting your password`
            html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)

        };

        // Send the email
        await transporter.sendMail(mailOptions);

        // Respond with success
        return res.json({ success: true, message: "OTP sent to your email" });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};


//Reset user password

export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.json({ success: false, message: "Email, OTP and new password are required" });
    }

    try {
        const user = await userModel.findOne({ email }); // <-- await was missing here

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if (user.resetOtp === "" || user.resetOtp !== otp) {
            return res.json({ success: false, message: "Invalid OTP" });
        }

        // Handle both Date object and timestamp
        if (new Date(user.resetOtpExpireAt).getTime() < Date.now()) {
            return res.json({ success: false, message: "OTP Expired" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10); // <-- typo fixed: bcrypt not bycrpt

        user.password = hashedPassword;
        user.resetOtp = "";
        user.resetOtpExpireAt = 0;

        await user.save();

        return res.json({ success: true, message: "Password reset successfully" });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};
