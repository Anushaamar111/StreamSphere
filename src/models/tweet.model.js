// tweets[icon: twitter]{
//     id string pk
//     owner ObjectId user
//     createdAt Date
//     updatedAt Date
//     content string
//   }

import mongoose, { Schema } from "mongoose";

const tweetSchema = new Schema(
  {
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default Tweets = mongoose.model("Tweets", { tweetSchema });
