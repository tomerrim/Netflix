import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import seedRouter from "../src/routes/seedRoute.js";

dotenv.config();

const PORT = process.env.PORT || 8000;
const MONGODB_URL = process.env.MONGODB_URL;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/seedData", seedRouter);

mongoose.connect(MONGODB_URL).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((e) => console.error(e));