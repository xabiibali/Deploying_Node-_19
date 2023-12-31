// Create endpoints for books, make sure to use the middleware to authenticate the token
import express from "express";
import prisma from "./lib/index.js";
import authenticate from "./middleware/authenticate.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const books = await prisma.book.findMany();
    if (books.length === 0) {
      return res.status(404).json({ status: 404, message: "Books not found!" });
    }

    res.json(books);
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await prisma.book.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!book) {
      return res.status(404).json({ status: 404, message: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

router.post("/", authenticate, async (req, res) => {
  try {
    const { bookstoreId, authorId, title, price, image } = req.body;

    const newBook = await prisma.book.create({
      data: {
        bookstoreId,
        authorId,
        title,
        price,
        image,
      },
    });

    if (!newBook) {
      return res.status(400).json({ messsage: "Book was not created!" });
    }
    res.status(200).json({
      message: "Book successFully created!",
      newBook: newBook,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});


router.put("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { bookstoreId, authorId, title, price, image } = req.body;

    const updateBook = await prisma.book.update({
      where: {
        id: Number(id),
      },
      data: {
        bookstoreId,
        authorId,
        title,
        price,
        image,
      },
    });

    if (!updateBook) {
      return res
        .status(400)
        .json({ status: 400, message: "Book not updated!" });
    }

    res.status(200).json({
      status: 200,
      message: "Book was updated!",
      updateBook: updateBook,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBook = await prisma.book.delete({
      where: {
        id: Number(id),
      },
    });
    if (!deleteBook) {
      return res.status(400).json({ message: "Book was not deleted!" });
    }
    res.status(200).json({ message: `Book successFully deleted` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;