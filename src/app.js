import express from "express";
import cors from "cors"; //cross origin source- it defines which applications can talk to my backend
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express();

//middlewares- are in between layers which perform operation during the server request and response

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
//common middlewares
app.use(express.json({ limits: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//import routes
import healthcheckRouter from "./routes/healthcheckroutes.js";
import userRouter from "./routes/userRouter.js";
import { errorHandler } from "./middlewares/error.middleware.js";
//routes
//first we are mentioning /api/v1/healthcheck is our api which when clicked leads to healthcheck which then handles the request
app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/users", userRouter);
app.use(errorHandler);

export { app };
