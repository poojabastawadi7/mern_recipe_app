import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";
import { RecipeRouter } from "./routes/recipes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", RecipeRouter)


mongoose.connect(
    "mongodb+srv://poojabastawadi7:Lo3iYWrOTHSMOBYf@cluster0.qetki.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
        dbName: "Recipes_db",
        useNewUrlParser : true,
        useUnifiedTopology: true,
    }
)

app.listen(3001, () => 
    console.log("Server is running at port 3001")
)