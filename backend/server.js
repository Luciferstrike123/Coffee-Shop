
const express = require('express');
const cors = require('cors')
const app = express();
const route = require('./routes/index.route')

const port = 8000;

//middlewares
app.use(cors());
app.use(express.json()); //for parsing application/json

//routes
route(app);

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})