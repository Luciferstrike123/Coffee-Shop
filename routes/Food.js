const express = require("express");
const router = express.Router();
const db = require("../db");

// Show Food
router.get("/food", async (req, res) => {
  try {
    const result = await db.query(`select * from food`);
    res.json(result.rows);
  } catch (error) {
    res.status(400).json({ mess: error.message });
  }
});

//Add Food
router.post("/food", async (req, res) => {
  const { id, name, cost } = req.body;
  try {
    const result = await db.query(
      "insert into food(id, name, cost) values($1, $2 , $3) returning *",
      [id, name, cost]
    );

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).send({ mess: error.message });
  }
});

// router.post("/food", async (req, res) => {
//   const foods = req.body;

//   try {
//     const queries = foods.map((food) => {
//       return db.query(
//         "Insert into food(id, name, cost) values ($1, $2, $3) returning *",
//         [food.id, food.name, food.cost]
//       );
//     });

//     const results = await Promise.all(queries);
//     res.status(200).json(results.map((result) => result.rows[0]));
//   } catch (error) {
//     res.status(500).send({ mess: error.message });
//   }
// });

// Delete Food
router.delete("/food/:id", async (req, res) => {
  const foodId = req.params.id;
  try {
    const results = await db.query(
      "Delete from food where id = $1 returning *",
      [foodId]
    );

    if (results.rowCount === 0) {
      return res.status(404).send({ message: "Food item not found." });
    }

    res.status(200).json(results.rows[0]); // Return the deleted food item
  } catch (error) {
    res.status(500).send({ mess: error.message });
  }
});

// Update Food
router.put("/food/:id", async (req, res) => {
  const foodId = req.params.id;
  const { name, cost } = req.body;

  try {
    const result = await db.query(
      "Update food set name = $1, cost = $2 where id = $3 returning *",
      [name, cost, foodId]
    );

    if (result.rowCount === 0) {
      return res.status(404).send({
        mess: "Food item not found.",
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).send({ mess: error.message });
  }
});

module.exports = router;
