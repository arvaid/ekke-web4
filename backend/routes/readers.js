const express = require('express');
const router = express.Router();
const service = require('../service/reader');

router.get('/', async (_req, res) => {
    try {
        const [rows] = await service.findAll();

        if (rows.length > 0) {
            res.status(200).json(rows);
        } else {
            res.status(404).json({
                message: "No readers found"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error getting readers",
            error: err
        });
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const [rows] = await service.findById(id);
        const reader = rows[0];

        if (rows.length > 0) {
            res.status(200).json(reader);
        } else {
            res.status(404).json({
                message: "Reader not found"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error getting reader",
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

    if (!req.body.registration_date) {
        res.status(400).json({
            message: "Registration date is required"
        });
        return;
    }

    const name = req.body.name;
    const registration_date = req.body.registration_date;

    try {
        const reader = {
            name: name,
            registration_date: registration_date
        };

        const [results] = await service.create(reader);

        if (results.affectedRows === 1) {
            res.status(200).json({
                message: "Reader created successfully",
                reader: {
                    id: results.insertId,
                    name: reader.name,
                    registration_date: new Date(reader.registration_date)
                }
            });
        }
        else {
            res.status(500).json({
                message: "Error creating reader",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error creating reader",
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

    if (!req.body.registration_date) {
        res.status(400).json({
            message: "Registration date is required"
        });
        return;
    }

    const id = req.params.id;
    const name = req.body.name;
    const registration_date = req.body.registration_date;

    try {
        const [rows] = await service.findById(id);
        const reader = rows[0];

        if (rows.length > 0) {
            const data = {
                name: name || reader.name,
                registration_date: registration_date || reader.registration_date
            };

            const [result] = await service.update(id, data);

            if (result.affectedRows === 1) {
                res.status(200).json({
                    message: "Reader updated successfully",
                    reader: {
                        id: id,
                        name: data.name,
                        registration_date: new Date(data.registration_date)
                    }
                });
            } else {
                res.status(500).json({
                    message: "Error updating reader"
                });
            }
        } else {
            res.status(404).json({
                message: "Reader not found"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error updating reader",
            error: err
        });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const [rows] = await service.findById(id);
        const reader = rows[0];

        if (rows.length > 0) {
            await service.delete(id);
            res.status(200).json({
                message: "Reader deleted successfully",
                reader: reader
            });
        } else {
            res.status(404).json({
                message: "Reader not found"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error deleting reader",
            error: err
        });
    }
});

module.exports = router;