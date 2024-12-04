import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`running at ${port}`);
      console.log(`Port from .env: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("No connection");
  });
