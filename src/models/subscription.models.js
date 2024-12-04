// subscription[icon: azure-subscriptions]{
//     id string pk
//     subscriber ObjectId user
//     channel ObjectId user
//     createdAt Date
//     updatedAt Date
//   }

import mongoose, { Schema } from "mongoose";

const subscriptionScheme = new Schema(
  {
    subscriberName: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    channel: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default Subscription = mongoose.model("Subscription", {
  subscriptionScheme,
});
