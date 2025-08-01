import Book from "../../models/Book.js";
import User from "../../models/User.js";
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
export const getBooks = async (request, response) => {
  try {
    //let userId = request.headers.authorization;
    let token = request.headers.authorization;
    // Decoding token
    let decoded = jwt.verify(token, JWT_KEY);
    // Check if user has an account
    let user = await User.findById(decoded.id);

    let Books = await Book.find({ user }).populate("user");
    return response.send(Books);
  } catch (error) {
    return response.status(500).send("Server Error");
  }
};

export const getBook = async (request, response) => {
  let { id } = request.params;
  console.log(id);
  // In case you are fetching with id
  // let Book = await Book.findById(id)

  // In case you are fetching with another field like slug for example
  //This is find one
  //let Book = await Book.findOne({ id });
  //The alternative is, this is more performant as well
  //let Book = await Book.find({ id });
  let book = await Book.findById(id);
  if (!book) return response.status(404).send("Book not found");
  return response.send(book);
};

export const createBook = async (request, response) => {
  try {
    // let { name, description, price, quantity, createdAt } = request.body;
    let { title, author, genre } = request.body;
    //let userId = request.headers.authorization;
    let token = request.headers.authorization;
    // Decoding token
    let decoded = jwt.verify(token, JWT_KEY);
    // Check if user has an account
    let user = await User.findById(decoded.id);

    // I generate slug from title
    // let slug =  name.replaceAll(" ", "-").toLowerCase() + "-" + new Date().getTime();
    // I create the Book
    await Book.create({
      title,
      author,
      genre,
      user,
    });
    response.status(201).send(`Book created successfully`);
  } catch (error) {
    console.log(error.message);
    response.status(500).send("Server Error");
  }
};

// https://mongoosejs.com/docs/tutorials/findoneandupdate.html
//https://kb.objectrocket.com/mongo-db/how-to-use-the-mongoose-findoneandupdate-method-925
export const updateBook = async (request, response) => {
  let { id } = request.params;
  let { title, author, genre } = request.body;

  let body = request.body;
  await Book.findOneAndUpdate({ _id: id }, { title, author, genre });

  response.status(202).send(`Updating a Book of id: ${id} with data: ${body}`);
};

//https://stackoverflow.com/questions/76980190/how-do-i-delete-a-document-in-mongodb-using-mongoose-in-node-js
export const deleteBook = async (request, response) => {
  let { id } = request.params;

  console.log(id);

  let book = await Book.findByIdAndDelete(id);
  if (!book) return response.status(404).send("Book not found");

  console.log("Deleted");

  //  const result = await User.findByIdAndDelete(id);
  response.status(202).send(`Book deleted: ${id}`);
};
