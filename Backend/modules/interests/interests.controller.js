import Offers from "../../models/Offer.js";
import User from "../../models/User.js";
import Book from "../../models/Book.js";
import Interest from "../../models/Interest.js";
import { JWT_KEY } from "../../config/variables.js";
import jwt from "jsonwebtoken";

// export const getBooks = async (request, response) => {
//   try {
//     // limit = items per page
//     let { page = 1, limit = 10 } = request.query;
//     // Page 1 Skip 0
//     // Page 2 Skip 10
//     // Page 3 Skip 20
//     // For page skip (page - 1) * itemsPerPage
//     let Books = await Book.find()
//       .limit(limit)
//       .skip((page - 1) * limit)
//       // Sorting by createdAt in descendant order
//       .sort({ createdAt: -1 });
//     return response.send(Books);
//   } catch (error) {
//     return response.status(500).send("Server Error");
//   }
// };

//Basic fetching
export const getInterests = async (request, response) => {
  try {
    //let userId = request.headers.authorization;
    // let token = request.headers.authorization;
    // Decoding token
    // let decoded = jwt.verify(token, JWT_KEY);
    // Check if user has an account
    // let user = await User.findById(decoded.id);

    let { offerid } = request.params;

    let interest = await Interest.find({ offer: offerid });
    return response.send(interest);
  } catch (error) {
    return response.status(500).send("Server Error");
  }
};

export const fetchinterests = async (request, response) => {
  let { id } = request.params;
  console.log(id);
  // In case you are fetching with id
  // let Book = await Book.findById(id)

  // In case you are fetching with another field like slug for example
  //This is find one
  //let Book = await Book.findOne({ id });
  //The alternative is, this is more performant as well
  //let Book = await Book.find({ id });
  let interest = await Interest.findById(id);
  if (!interest) return response.status(404).send("Book not found");
  return response.send(interest);
};

export const showinterest = async (request, response) => {
  try {
    // let { name, description, price, quantity, createdAt } = request.body;
    let { description, title, book } = request.body;
    //let userId = request.headers.authorization;
    let token = request.headers.authorization;
    // Decoding token
    let decoded = jwt.verify(token, JWT_KEY);
    // Check if user has an account
    let user_interested = await User.findById(decoded.id);
    console.log("Hello");

    let { offer } = request.params;
    console.log(offer);

    //let books = await Book.findById(book);
    //console.log("Hello");

    // I generate slug from title
    // let slug =  name.replaceAll(" ", "-").toLowerCase() + "-" + new Date().getTime();
    // I create the Book
    await Interest.create({
      description,
      title,
      book,
      offer,
      user_interested,
    });
    response.status(201).send(`Interest created successfully`);
  } catch (error) {
    console.log(error.message);
    response.status(500).send("Server Error");
  }
};

// https://mongoosejs.com/docs/tutorials/findoneandupdate.html
//https://kb.objectrocket.com/mongo-db/how-to-use-the-mongoose-findoneandupdate-method-925
// export const updateOffer = async (request, response) => {
//   let { id } = request.params;
//   let { description, title, book } = request.body;

//   let body = request.body;
//   await Offers.findOneAndUpdate({ _id: id }, { description, title, book });

//   response.status(202).send(`Updating a Book of id: ${id} with data: ${body}`);
// };

//https://stackoverflow.com/questions/76980190/how-do-i-delete-a-document-in-mongodb-using-mongoose-in-node-js
// Here in this part, we will also swap the book between the two users as well and then later delete the interest as well.
export const acceptinterest = async (request, response) => {
  let { interestid } = request.params;

  let interest = await Interest.findByIdAndDelete(interestid);
  if (!interest) return response.status(404).send("Book not found");

  //  const result = await User.findByIdAndDelete(id);
  response.status(202).send(`Book deleted: ${interestid}`);
};
