const express = require("express");
const router = express.Router();
const db = require('../../db');

router.get("/products", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM products");
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

router.get("/products/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query("SELECT * FROM products WHERE product_id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).send("Product not found");
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

router.post("/products", async (req, res) => {
    const {
        product_category,
        product_type,
        product_name,
        product_description,
        product_rating,
        product_unit_price,
        product_image,
        product_discount,
    } = req.body;
    try {
        const result = await db.query(
            `INSERT INTO products 
                (product_category, 
                product_type, 
                product_name,
                product_description,
                product_rating,
                product_unit_price,
                product_image,
                product_discount) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [
                product_category,
                product_type,
                product_name,
                product_description,
                product_rating,
                product_unit_price,
                product_image,
                product_discount,
            ]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

router.put("/products/:id", async (req, res) => {
    const { id } = req.params;
    const {
        product_category,
        product_type,
        product_name,
        product_description,
        product_rating,
        product_unit_price,
        product_image,
        product_discount,
    } = req.body;

    try {
        const result = await db.query(
            `UPDATE products SET 
                product_category = $1,
                product_type = $2,
                product_name = $3,
                product_description = $4,
                product_rating = $5,
                product_unit_price = $6,
                product_image = $7,
                product_discount = $8
            WHERE product_id = $9 RETURNING *`,
            [
                product_category,
                product_type,
                product_name,
                product_description,
                product_rating,
                product_unit_price,
                product_image,
                product_discount,
                id
            ]);
        if (result.rows.length === 0) {
            return res.status(404).send("Product not found");
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete("/products/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query("DELETE FROM products WHERE product_id = $1 RETURNING *", [id]);
        if (result.rowCount === 0) {
            return res.status(404).send("Product not found");
        }
        res.json({ message: "Product deleted", product: result.rows[0] });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;