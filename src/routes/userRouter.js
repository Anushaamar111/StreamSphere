import { RegisterUser } from "../controllers/user.controllers.js";
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "Avatar",
      maxCount: 1,
    },
    {
      name: "CoverImage",
      maxCount: 1,
    },
  ]),
  RegisterUser
);
export default router;
