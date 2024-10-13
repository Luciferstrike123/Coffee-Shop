const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/login", async (req, res) => {
  try {
    res.status(200).send({ mess: "Food reserved" });
  } catch (error) {
    res.status(400).json({ mess: error.message });
  }
});

module.exports = router;
