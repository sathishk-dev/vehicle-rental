import mongoose from 'mongoose'
import cors from 'cors'
import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import cookieParser from 'cookie-parser'
import userModel from './models/Users.js'
import AdminModel from './models/Admin.js'
import vehicleModel from './models/Vehicles.js'
import favVehicleModel from './models/Favourite.js'
import { OAuth2Client } from 'google-auth-library'

dotenv.config();

const app = express()
app.use(cookieParser())
app.use(express.json());
app.use(cors({
    origin: [process.env.CLIENT_URL],
    credentials: true
}))

mongoose.connect(process.env.MONGODB);

const transporter = nodemailer.createTransport({
    service:'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASS
    },
});

app.post('/register_data', async (req, res) => {
    const { signupFirstName, signupLastName, signupEmail, signupPassword } = req.body;

    try {
        const existUser = await userModel.findOne({ signupEmail:signupEmail });
        if (existUser) {
            return res.json({ message: 'User already exist'});
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

        const verifyUrl = `${process.env.SERVER_URL}/verify-email?token=${token}`;
        const mailOption = {
            from:{
                name:'KSS Rental',
                address: process.env.EMAIL
            },
            to:signupEmail,
            subject:'Email Verification',
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

})

app.get('/verify-email',async(req,res)=>{
    const {token} = req.query;
    try{
        const user = await userModel.findOne({token});
        if(!user){
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
    catch(err){
        res.status(500).json({ message: 'Server error', err });
    }
})

app.post('/login', async(req, res) => {
    const { loginEmail, loginPassword } = req.body;
    try{
        const user = await userModel.findOne({signupEmail:loginEmail});
        if(!user){
            return res.json('User not found !');
        }
        const passValid = await bcrypt.compare(loginPassword, user.signupPassword);
        if (!passValid) {
            return res.json('Password is Incorrect');
        }
        if(!user.verified){
            const newToken = crypto.randomBytes(32).toString('hex');
            user.token = newToken;
            await user.save();

            const verifyUrl = `${process.env.SERVER_URL}/verify-email?token=${newToken}`;
            const mailOption = {
                from:{
                    name:'KSS Rental',
                    address: process.env.EMAIL
                },
                to:loginEmail,
                subject:'Email Verification Remainder',
                html: `<h3>Hello ${user.signupFirstName},</h3>
                 <p>Please verify your email by clicking the link below:</p>
                 <a href="${verifyUrl}">Verify Email</a>`,
            }
            await transporter.sendMail(mailOption);
            return res.json('Please verify your email !');
        }
        res.json({message:'Success',user})

    }
    catch(err){
        res.json({message:'error',err})
    }

})

// Google login setup
const clientAuth = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
app.post('/api/auth/google',async(req,res)=>{
    const {token} = req.body;
    try{
        const ticket = await clientAuth.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payLoad = ticket.getPayload();
        const userEmail = payLoad.email;

        let user = await userModel.findOne({signupEmail:userEmail});
        if(!user){
            user = new userModel({
                signupFirstName:payLoad.given_name,
                signupLastName:payLoad.family_name,
                signupEmail:payLoad.email,
            })
            await user.save();
        }
        const googleJwtToken = jwt.sign({userId: user._id},process.env.JWT_ACCESS_KEY,{expiresIn:'1h'});
        res.json({ message: 'User authenticated', token: googleJwtToken })

    }
    catch(err){
        console.log(err)
        res.json({ message: 'Unauthorized' })
    }

});


// admin login setup
app.post('/adminLogin', (req, res) => {
    const { email, password } = req.body;
    AdminModel.findOne({ email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    const accessToken = jwt.sign({ email: email }, process.env.JWT_ACCESS_KEY, { expiresIn: '30m' })
                    const refreshToken = jwt.sign({ email: email }, process.env.JWT_REFRESH_KEY, { expiresIn: '1h' })

                    res.cookie('accessToken', accessToken, { maxAge: 30 * 60 * 1000 })
                    res.cookie('refreshToken', refreshToken, { maxAge: 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: 'strict' })

                    return res.json({ login: true, name: user.name })
                }
                else {
                    res.json({ login: false, message: "You are not Admin" })
                }
            }
            else {
                res.json({ login: false, message: "You are not Admin" })
            }
        })
        .catch(err => res.json(err))
})

const renewToken = (req, res) => {
    const refreshtoken = req.cookies.refreshToken;
    if (!refreshtoken) {
        return res.json({ valid: false, message: "No refresh token" });
    }

    jwt.verify(refreshtoken, process.env.JWT_REFRESH_KEY, (err, decoded) => {
        if (err) {
            return res.json({ valid: false, message: "Invalid Refresh Token" });
        }

        const accessToken = jwt.sign({ email: decoded.email }, process.env.JWT_ACCESS_KEY, { expiresIn: '30m' });
        res.cookie('accessToken', accessToken, { maxAge: 60000 });
        return res.json({ valid: true });
    });
};

const verifyUser = (req, res, next) => {
    const accesstoken = req.cookies.accessToken;
    if (!accesstoken) {
        return renewToken(req, res);
    }
    jwt.verify(accesstoken, process.env.JWT_ACCESS_KEY, (err, decoded) => {
        if (err) {
            return res.json({ valid: false, message: "Invalid Token" });
        }
        req.email = decoded.email;
        next();
    });
};

// Admin dashboard route
app.get('/dashboard', verifyUser, (req, res) => {
    return res.json({ valid: true, email: req.email });
});


app.get('/adminLogout', (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.json({ logout: true });
})

// store vehicle data

app.post('/addVehicle', (req, res) => {
    const { vehicleName, category, vehicleDetails, vehicleType, vehicleMode, actualPrice, offerPrice, vehicleImage, fuelCapacity, vehicleCapacity } = req.body;
    vehicleModel.create({ vehicleName, category, details: vehicleDetails, type: vehicleType, mode: vehicleMode, actualPrice, offerPrice, imageUrl: vehicleImage, fuelCapacity, capacity: vehicleCapacity })
        .then(data => {
            res.json({ data: data, message: "Vehicle added successfully!" })
        })
        .catch(err => res.json(err.message))

})

// app.post('/getVehicles', (req, res) => {
//     const {userId} = req.body;
//     if(!userId){

//     }
//     vehicleModel.find({})
//         .then(data => {
//             if (data) {
//                 res.json(data)
//             }
//             else {
//                 res.json("vehicles Not Found")
//             }
//         })
//         .catch(err => res.json(err))
// })
app.post('/getVehicles', async(req, res) => {
    const {userId} = req.body;
    try{
        const vehicles = await vehicleModel.find({});
        if(!userId){
            return res.json(vehicles)
        }
        const favVehicles = await favVehicleModel.find({userId:userId});
        const likedVehicleId = new Set(favVehicles.map(veh=>veh.vehicleId));
        const updatedVehicles = vehicles.map(vehicle=>{
            if(likedVehicleId.has(vehicle._id.toString())){
                vehicle.isLiked = true;
            }
            return vehicle;
        });

        res.json(updatedVehicles);
    }
    catch(err){
        res.json("error")
    }
    
})

app.delete('/deleteVehicle/:id', (req, res) => {
    const id = req.params.id;
    vehicleModel.findByIdAndDelete({ _id: id })
        .then(data => res.json(data))
        .catch(err => res.json(err))
})

// display users in admin page
app.post('/getUsers', (req, res) => {
    userModel.find({})
        .then(users => {
            if (users) {
                res.json(users)
            }
            else {
                res.json("No registered User")
            }
        })
        .catch(err => res.json(err))
})


// Update Favourites vehicle
app.put('/updateFavourite/:id',async(req,res)=>{
    try{
        const vehicleId = req.params.id;
        const {toggleLike,userId} = req.body;
        if(toggleLike===true){
            await favVehicleModel.create({
                userId:userId,
                vehicleId:vehicleId,
                isLiked:toggleLike
            });
            return res.json({message:'Successfully Updated'})
        }
        await favVehicleModel.findOneAndDelete({vehicleId:vehicleId});
        res.json({message:'Successfully Removed'});

        // await vehicleModel.findByIdAndUpdate(vehicleId,{isLiked:toggleLike});
        // res.json({message:'Successfully Updated'})
    }
    catch(err){
        res.json({message:'error while update',err})
    }
    

});

app.get("/", (req,res)=>{
    res.send("Welcom vehicle rendal");
})

app.listen(3001, () => {
    console.log("Server is Running")
})
