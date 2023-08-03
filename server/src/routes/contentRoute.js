import express from "express";
import expressAsyncHandler from "express-async-handler";
import { getAllContent, getAllMovies, getAllSeries, getContentById } from "../controllers/contentController.js";

const contentRouter = express.Router()

contentRouter.get('/', expressAsyncHandler(getAllContent));

contentRouter.get('/movies', expressAsyncHandler(getAllMovies));

contentRouter.get('/series', expressAsyncHandler(getAllSeries));

contentRouter.get('/:id',expressAsyncHandler(getContentById));

export default contentRouter;