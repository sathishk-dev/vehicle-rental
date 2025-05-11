import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { OAuth2Client } from 'google-auth-library'
import userModel from '../models/Users.js';


const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASS
    },
});

export const userRegister = async (req, res) => {
    const { signupFirstName, signupLastName, signupEmail, signupPassword } = req.body;

    try {
        const existUser = await userModel.findOne({ signupEmail: signupEmail });
        if (existUser) {
            return res.json({ message: 'User already exist' });
        }

        const hash = await bcrypt.hash(signupPassword, 10);
        const token = crypto.randomBytes(32).toString('hex');

        const newUser = await userModel.create({
            signupFirstName,
            signupLastName,
            signupEmail,
            signupPassword: hash,
            verified: false,
            token
        });

        const verifyUrl = `${process.env.SERVER_URL}/api/auth/verify?token=${token}`;
        const mailOption = {
            from: {
                name: 'KSS Rental',
                address: process.env.EMAIL
            },
            to: signupEmail,
            subject: 'Email Verification',
            html: `<h3>Hello ${signupFirstName},</h3>
             <p>Please verify your email by clicking the link below:</p>
             <a href="${verifyUrl}">Verify Email</a>`,
        }
        try {
            await transporter.sendMail(mailOption);
            res.status(200).json({ message: true });
        } catch (err) {
            console.error("Error sending email:", err);
            return res.status(500).json({ message: 'Failed to send email', error: err.message });
        }
    }
    catch (err) {
        console.error("Error during registration:", err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }

}

export const verifyEmail = async (req, res) => {
    const { token } = req.query;
    try {
        const user = await userModel.findOne({ token });
        if (!user) {
            return res.json({ message: 'Invalid or expired token' });
        }
        user.verified = true;
        user.token = null;
        await user.save();
        res.status(200).send(`
            <head>
            <title>Email Verification</title>
            </head>
            <body>
            <h3>Email Verified Successfully Now go to <a href=${process.env.CLIENT_URL}>Login</a></h3>
            </body>
            `);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', err });
    }
}

export const userLogin = async (req, res) => {
    const { loginEmail, loginPassword } = req.body;
    try {
        const user = await userModel.findOne({ signupEmail: loginEmail });
        if (!user) {
            return res.json('User not found !');
        }
        const passValid = await bcrypt.compare(loginPassword, user.signupPassword);
        if (!passValid) {
            return res.json('Password is Incorrect');
        }
        if (!user.verified) {
            const newToken = crypto.randomBytes(32).toString('hex');
            user.token = newToken;
            await user.save();

            const verifyUrl = `${process.env.SERVER_URL}/api/auth/verify?token=${newToken}`;
            const mailOption = {
                from: {
                    name: 'KSS Rental',
                    address: process.env.EMAIL
                },
                to: loginEmail,
                subject: 'Email Verification Remainder',
                html: `<h3>Hello ${user.signupFirstName},</h3>
                 <p>Please verify your email by clicking the link below:</p>
                 <a href="${verifyUrl}">Verify Email</a>`,
            }
            await transporter.sendMail(mailOption);
            return res.json('Please verify your email !');
        }
        res.json({ message: 'Success', user })

    }
    catch (err) {
        res.json({ message: 'error', err })
    }

}

// Google login setup
const clientAuth = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = async (req, res) => {
    const { token } = req.body;
    try {
        const ticket = await clientAuth.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payLoad = ticket.getPayload();
        const userEmail = payLoad.email;

        let user = await userModel.findOne({ signupEmail: userEmail });
        if (!user) {
            user = new userModel({
                signupFirstName: payLoad.given_name,
                signupLastName: payLoad.family_name,
                signupEmail: payLoad.email,
            })
            await user.save();
        }
        const googleJwtToken = jwt.sign({ userId: user._id }, process.env.JWT_ACCESS_KEY, { expiresIn: '1h' });
        res.json({ message: 'User authenticated', token: googleJwtToken, userId: user._id })

    }
    catch (err) {
        console.log(err)
        res.json({ message: 'Unauthorized' })
    }

}

