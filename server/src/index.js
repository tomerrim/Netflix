import express from "express";
import cors from "cors";
import seedRouter from "../src/routes/seedRoute.js";
import userRouter from "./routes/userRoute.js";
import contentRouter from "./routes/contentRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/seedData", seedRouter);
app.use("/api/content", contentRouter);

export default app;