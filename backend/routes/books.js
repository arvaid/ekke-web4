const express = require('express');
const router = express.Router();
const service = require('../service/book');

router.get('/', async (_req, res) => {
    try {
        const [rows] = await service.findAll();

        if (rows.length > 0) {
            res.status(200).json(rows.map(row => ({
                    isbn: row.isbn,
                    title: row.title,
                    author: {
                        id: row.id,
                        name: row.name
                    }
                }
            )));
        } else {
            res.status(404).json({
                message: "No books found"
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Error getting books",
            error: err
        })
    }
});

router.get('/:isbn', async (req, res) => {
    const isbn = req.params.isbn;

    try {
        const [rows] = await service.findByISBN(isbn);
        const data = rows[0];

        if (rows.length > 0) {
            res.status(200).json({
                isbn: data.isbn,
                title: data.title,
                author: {
                    id: data.id,
                    name: data.name
                }
            });
        } else {
            res.status(404).json({
                message: "Error getting book"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error getting book",
            error: err
        });
    }
});

router.post('/', async (req, res) => {
    if (!req.body.isbn) {
        res.status(400).json({
            message: "ISBN is required"
        });
        return;
    }

    if (!req.body.title) {
        res.status(400).json({
            message: "Title is required"
        });
        return;
    }

    if (!req.body.author) {
        res.status(400).json({
            message: "Author is required"
        });
        return;
    }

    try {
        const book = {
            isbn: req.body.isbn,
            title: req.body.title,
            author: req.body.author
        }

        const [results] = await service.create(book);

        if (results.affectedRows === 1) {
            res.status(200).json({
                message: "Book created successfully",
                book: book
            });
        } else {
            res.status(500).json({
                message: "Error creating author"
            });
        }

    } catch (err) {
        res.status(500).json({
            message: "Error creating book",
            error: err
        });
    }
});

router.put('/:isbn', async (req, res) => {
    const isbn = req.params.isbn;
    const title = req.body.title;
    const author = req.body.author;

    try {
        const [rows] = await service.findByISBN(isbn);
        const book = rows[0];

        if (rows.length > 0) {

            const data = {
                isbn: isbn || book.isbn,
                title: title || book.title,
                author: author || {id: book.id}
            }

            const [result] = await service.update(isbn, data);

            if (result.affectedRows === 1) {
                res.status(200).json({
                    message: "Book updated successfully",
                    book: data
                });
            } else {
                res.status(500).json({
                    message: "Error updating book"
                });
            }

        } else {
            res.status(500).json({
                message: "Error updating book"
            });
        }

    } catch (err) {
        res.status(500).json({
            message: "Error updating book",
            error: err
        });
    }
});

router.delete('/:isbn', async (req, res) => {
    const isbn = req.params.isbn;

    try {
        const [rows] = await service.findByISBN(isbn);
        const book = rows[0];

        if (rows.length > 0) {
            await service.delete(isbn);

            res.status(200).json({
                message: "Book deleted successfully",
                book: book
            });

        } else {
            res.status(404).json({
                message: "Book not found"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error deleting book",
            error: err
        });
    }
});

module.exports = router