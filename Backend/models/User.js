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
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "customer"],
      default: "user",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
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
