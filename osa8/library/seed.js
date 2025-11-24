const mongoose = require("mongoose");
const Author = require('./schemas/Author')
const Book = require('./schemas/Book')
require('dotenv').config()


async function seed() {
const MONGODB_URI = process.env.MONGODB_URI
    mongoose.connect(MONGODB_URI);

  console.log("🌱 Clearing old data...");
  await Author.deleteMany({}); // clear user collection
  await Book.deleteMany({})

  console.log("🌱 Inserting sample data...");

  console.log("🌱 Seeding complete!");
  mongoose.disconnect();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
