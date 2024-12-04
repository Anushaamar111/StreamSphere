// playlist[icon: list]{
//     id string pk
//     name string
//     description string
//     createdAt Date
//     updatedAt Date
//     createdBy string users
//     videos ObjectId[]
//     owner ObjectId
//   }

import mongoose, { Schema } from "mongoose";

const playlistSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },
    desription: {
      type: String,
      required: true,
    },
    videos: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Playlist = mongoose.model("Playlist", playlistSchema);
