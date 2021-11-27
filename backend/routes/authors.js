const express = require('express');
const router = express.Router();
const service = require('../service/author');

router.get('/', async (_req, res) => {
    try {
        const [rows] = await service.findAll();

        if (rows.length > 0) {
            res.status(200).json(rows);
        } else {
            res.status(404).json({
                message: "No authors found"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error getting authors",
            error: err
        });
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const [rows] = await service.findById(id);
        const author = rows[0];

        if (rows.length > 0) {
            res.status(200).json(author);
        } else {
            res.status(404).json({
                message: "Author not found"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error getting author",
            error: err
        });
    }
});

router.post('/', async (req, res) => {
    if (!req.body.name) {
        res.status(400).json({
            message: "Name is required"
        });
        return;
    }

    try {
        const author = {
            name: req.body.name
        };
        const [results] = await service.create(author);

        if (results.affectedRows === 1) {
            res.status(200).json({
                message: "Author created successfully",
                author: {
                    id: results.insertId,
                    name: author.name
                }
            });
        }
        else {
            res.status(500).json({
                message: "Error creating author",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error creating author",
            error: err
        });
    }
});

router.put('/:id', async (req, res) => {
    if (!req.body.name) {
        res.status(400).json({
            message: "Name is required"
        });
        return;
    }

    const id = req.params.id;

    try {
        const [rows] = await service.findById(id);
        const author = rows[0];

        if (rows.length > 0) {
            const data = {
                name: req.body.name || author.name
            };

            const [result] = await service.update(id, data);

            if (result.affectedRows === 1) {
                res.status(200).json({
                    message: "Author updated successfully",
                    author: {
                        id: id,
                        name: data.name
                    }
                });
            } else {
                res.status(500).json({
                    message: "Error updating author"
                });
            }
        } else {
            res.status(404).json({
                message: "Author not found"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error updating author",
            error: err
        });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const [rows] = await service.findById(id);
        const author = rows[0];

        if (rows.length > 0) {
            await service.delete(id);

            res.status(200).json({
                message: "Author deleted successfully",
                author: author
            });

        } else {
            res.status(404).json({
                message: "Author not found"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error deleting author",
            error: err
        });
    }
});

module.exports = router;