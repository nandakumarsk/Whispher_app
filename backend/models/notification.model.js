import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["follow", "like", "comment"],
    },
    message: {
      type: String,
      required: function () {
        return this.type === "comment";
      },
    },
    read: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

// Ensure sender and recipient are not the same
notificationSchema.pre("save", function (next) {
  if (this.from.toString() === this.to.toString()) {
    return next(new Error("Sender and recipient cannot be the same"));
  }
  next();
});

// Add indexes for performance
notificationSchema.index({ to: 1, read: 1 });

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
