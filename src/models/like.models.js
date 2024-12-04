// likes[icon : heart]{
//     id string pk
//     comment ObjectId comments
//     createdAt Date
//     updatedAt Date
//     LikedBy ObjectId user
//     tweet ObjectId tweets
//     video ObjectId videos
//   }

import mongoose, { Schema } from "mongoose";


const LikeSchema = new Schema(
  {
    likedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    tweets: {
      type: Schema.Types.ObjectId,
      ref: "Tweets",
    },
    videos: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
  },
  { timestamps: true }
);

export default Likes = mongoose.mondel("Likes", LikeSchema);
