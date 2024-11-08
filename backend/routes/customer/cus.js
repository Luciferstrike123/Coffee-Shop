const express = require("express");
const router = express.Router();
const db = require("../../db");

function formatPhoneNumber(phoneNumber) {
  // Remove any non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, "");
  if (cleaned.length === 10) {
    // Format phone number as 079-5758-758
    return cleaned.replace(/^(\d{3})(\d{4})(\d{3})$/, "$1-$2-$3");
  }
  return null;
}

router.post("/register", async (req, res) => {
  const {
    customer_name,
    customer_username,
    customer_password,
    customer_birthdate,
    customer_gender,
    customer_address,
    customer_phone_number,
  } = req.body;

  Format_phone = formatPhoneNumber(customer_phone_number);

  try {
    const result = await db.query(
      `Insert into customers
        (customer_name,
        customer_username,
        customer_password,
        customer_birthdate,
        customer_gender,
        customer_address,
        customer_phone_number )
        Values ($1, $2, $3, $4, $5, $6, $7) returning *`,
      [
        customer_name,
        customer_username,
        customer_password,
        customer_birthdate,
        customer_gender,
        customer_address,
        Format_phone,
      ]
    );

    res.status(200).send(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ mess: { error } });
  }
});

module.exports = router;
