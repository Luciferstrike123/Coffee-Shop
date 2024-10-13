const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/FwU", async (req, res) => {
  try {
    const result = await db.query(`select 
           food.id as food_id,
           food.name,
           food.cost,
           users.username,
           users.email
        from 
          food 
        join
          users On food.user_id = users.id`);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).send({
      mess: error.message,
    });
  }
});

module.exports = router;
