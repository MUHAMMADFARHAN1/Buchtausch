import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
    offers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Offer",
      },
    ],
    interests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Interest",
      },
    ],
    // createdAt: {
    //   type: Date,
    //   default: new Date(),
    // },
  },
  { timestamps: true } // For each instance you will have createdAt and updatedAt
);

export default mongoose.model("User", userSchema);
