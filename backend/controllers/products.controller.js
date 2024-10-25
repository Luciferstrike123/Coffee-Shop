const pool = require('../configs/db')

module.exports.getProducts = async (req, res) => {
    try {
        const products = await pool.query('SELECT * FROM products');
        res.status(200).json(products);
    }
    catch(err) {
        console.error("Error executing query:", err); // Log the error
        res.status(500).json({ error: 'Internal Server Error' }); // Respond with status 500
    }
}