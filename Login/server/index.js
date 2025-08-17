const express = require('express');
const app = express();
const router = require('./routes/authRoutes.js')
const cors = require('cors');
app.use(cors());
app.use(express.json());
require('dotenv').config();
app.use('/auth',router);


app.listen(process.env.PORT, () =>{
    console.log("Server is listening to the PORT ",process.env.PORT);
})