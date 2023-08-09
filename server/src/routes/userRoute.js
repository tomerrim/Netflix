import express from "express";
import expressAsyncHandler from "express-async-handler";
import { signIn, signUp, toggleFavorite, toggleWatchList } from "../controllers/userController.js";
import { isAuth } from "../utils.js";

const userRouter = express.Router();

userRouter.post("/signin", expressAsyncHandler(signIn));

userRouter.post("/signup", expressAsyncHandler(signUp));

userRouter.post("/toggle-favorite/:contentId", isAuth, expressAsyncHandler(toggleFavorite));

userRouter.post("/toggle-watch/:contentId", isAuth, expressAsyncHandler(toggleWatchList));

// userRouter.post("/watchList/add", expressAsyncHandler(addToWatchList));

// userRouter.get("/watchList/:userId", expressAsyncHandler(getWatchList));

export default userRouter;