import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({username});

    if(user){
        return res.json({
            message : "USer already exist!"
        })
    }

    const hashedPAssword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({username, password: hashedPAssword});
    await newUser.save();

    res.json({
        message : "User registered successfully!"
    });
});

export { router as userRouter};