const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../configs/db');

module.exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Fetch user from PostgreSQL based on username
    const query = 'SELECT * FROM customers WHERE customer_username = $1';
    const result = await pool.query(query, [username]);

    if (result.rows.length > 0) {
      const user = result.rows[0];

      // Compare the provided password with the (hashed) password in the database
      //bcrypt.compare(password, user.customer_password, (err, same) => { (for future implementation)
        if (password == user.customer_password) {
          // Generate JWT token
          const token = jwt.sign(
            { customer_id: user.customer_id, username: user.customer_username },
            process.env.TOKEN_KEY,
            { expiresIn: "8h" }
          );

          user.token = token;

          res.status(200).json({ status: "success", user });
        } else {
          res.status(400).json({ status: "fail", message: "Invalid password." });
        }
      //});
    } else {
      res.status(400).json({ status: "fail", message: "Invalid username." });
    }
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};
