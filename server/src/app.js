import express from "express";
import cors from "cors";
import seedRouter from "./routes/seedRoute.js";
import userRouter from "./routes/userRoute.js";
import contentRouter from "./routes/contentRoute.js";

const app = express();

app.use(
  cors({
    origin: "https://tomer-netflix.vercel.app",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/seedData", seedRouter);
app.use("/api/content", contentRouter);

app.use((err, req, res, next) => {
    console.error("Unhandled error: ", err);
    res.status(500).send("Server error. Please try again later.")
})
console.log("test");
export default app;