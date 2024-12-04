// videos[icon: video]{
//     id string pk
//     title string-
//     description string-
//     createdAt Date
//     owner ObjectId user-
//     duration number-
//     views number-
//     isPublished boolean
//     updatedAt Date
//     likes number
//     videoFile string-
//     thumbnail string-
//   }

import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const VideoSchema = new Schema(
  {
    videoFile: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    duration: {
      type: Number,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

videoSchemaa.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video", VideoSchema);
