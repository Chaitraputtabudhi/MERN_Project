const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const courseroutes = require('./routes/courseroutes');

const PORT = process.env.PORT || 5000;



mongoose.connect("mongodb://mongo:27017/basic-mern-app").then(() => {
    console.log('Connected to the Database');
}).catch((err) => console.log(err));

app.use(cors());


app.use(courseroutes);

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
