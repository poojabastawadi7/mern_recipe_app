import express from "express";
import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const response = await RecipeModel.find();
        res.json(response);
        
    } catch (error) {
        console.error(error)
    }
})

router.post("/", verifyToken , async (req, res) => {
    const recipe = new RecipeModel(req.body) ;

    try {
        const response = await recipe.save();
        res.json(response);
        
    } catch (error) {
        console.error(error)
    }

})

router.put("/", verifyToken, async  (req, res) => {
   

    try {
        const recipe = await RecipeModel.findById(req.body.recipeID) ;
        const user = await UserModel.findById(req.body.userID) ;
        user.savedRecipes.push(recipe)
        await user.save()
        res.json({savedRecipes: user.savedRecipes});
        
    } catch (error) {
        console.error(error)
    }

})

router.get("/savedRecipes/ids/:userID", async (req, res) => {
    

    try {
        const user = await UserModel.findById(req.params.userID) ;

        res.json({savedRecipes: user?.savedRecipes});
        
    } catch (error) {
        console.error(error)
    }

});

router.get("/savedRecipes/:userID", async (req, res) => {
    

    try {
        const user = await UserModel.findById(req.params.userID) ;
        const savedRecipes = await RecipeModel.find({
            "_id" : { $in : user.savedRecipes },
        })
        res.json({savedRecipes});
        
    } catch (error) {
        console.error(error)
    }

})

export { router as RecipeRouter };

//1.42