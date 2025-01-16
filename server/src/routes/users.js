import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    const user = await UserModel.findOne({username});

    if(user){
        return res.json({
            message : "USer already exist!"
        })
    }

    const hashedPAssword = await bcrypt.hash(password, 10);
    const hashedConfirmPAssword = await bcrypt.hash(confirmPassword, 10);

    const newUser = new UserModel({username, email, password: hashedPAssword, confirmPassword: hashedConfirmPAssword});
    await newUser.save();

    res.json({
        message : "User registered successfully!"
    });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({email});
    console.log(user);
    

    if(!user){
       return res.json({
            message : "User doesn't exist!"
        })
    }

    const isPAsswordValid = await bcrypt.compare(password, user.password);

    if(!isPAsswordValid){
        return res.json({
            message : "USername or Password IS Incorrect"
        })
    }

    const token =  jwt.sign({id: user._id }, "secret");
    res.json({ token, userID : user._id})
})

export { router as userRouter};

 export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization ;

    if(token){
        jwt.verify(token, "secret", (err) => {
            if(err) {
                res.sendStatus(403);
                next();
            }
            
        })
    } else {
        res.sendStatus(401)
    }
    
}