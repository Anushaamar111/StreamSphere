import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/errorResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";

try {
  const generateAccessAndRefreshToken = async (userID) => {
    const user = await User.findById(userID);
    if (!user) {
      throw new ApiError(400, "User not found");
    }
    const refreshToken = generateRefreshToken();
    const accessToken = accessToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  };
} catch (error) {
  throw new ApiError(
    500,
    "Something went wrong while generating access and refresh token"
  );
}
const RegisterUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;
  //validation

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(408, "User already exists");
  }
  const AvatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!AvatarLocalPath) {
    throw new ApiError(400, "Error");
  }

  const avatar = await uploadOnCloudinary(AvatarLocalPath);

  let coverImage = "";

  if (coverImageLocalPath) {
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage.url || "",
    email,
    password,
    username,
  });

  const createdUser = await User.findById(user._id);

  if (!createdUser) {
    throw new ApiError(400, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User created successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  //get data from body
  const { email, username, password } = req.body;

  //validate
  if (!email) {
    throw new ApiError(400, "Email not found, cannot login");
  }

  const user = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  //validate password

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(400, "Password is not valid");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedinUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .cookie("accessToken ", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedinUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(409, "Refresh token required");
  }
});

export { RegisterUser, loginUser };
