// comments[icon: comment]{
//     id string pk
//     content string
//     owner ObjectId user
//     createdAt Date
//     updatedAt Date
//     video ObjectId videos
//   }

import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const commentSchema = new Schema(
  {
    CommentBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
    videos: {
      type: mongoose.Types.ObjectId,
      ref: "Video",
    },
  },
  { timestamps: true }
);

commentSchema.plugin(mongooseAggregatePaginate);
export default Comment = mongoose.model("Comment", commentSchema);
