import mongoose from "mongoose";

const interestSchema = new mongoose.Schema(
  {
    Description: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
    offer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Offer",
    },
    user_interested: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

//The convention is Document(Schema) name, schma object and then remote colection name
//It is better to have Document name here as default convention and allow moongoose to create pural of document name remote by default
//This is to keep the DB clean
// The reposnsbility of creating and naming collection should be done by moongose in plural is better

//export default mongoose.model("Product", productSchema);
export default mongoose.model("Interest", interestSchema, "Interests");

// E11000 duplicate key error collection: Books.Products index: slug_1 dup key: { slug: null }
// happens when the schema is fixed on mongoDB side and can only be fixed by deleting the DB altogether.
// As imlciitly the value is fixed
