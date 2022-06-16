const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const app = express();

//import route
const postRoutes = require('./routes/posts');
const categoryRoutes = require('./routes/category');
const userRoutes = require('./routes/users');

///app middleware
app.use(bodyParser.json());

app.use(cors());

//route middleware
app.use(postRoutes);
app.use(categoryRoutes);
app.use(userRoutes);

const PORT = 8000;
const DB_URL = 'mongodb+srv://Manisha:Sahan0702@cluster0.d2vof.mongodb.net/mernCrud?retryWrites=true&w=majority';

mongoose.connect(DB_URL)
.then(() =>{
    console.log('DB connected.');
})
.catch((err) => console.log('DB connection error',err));



app.listen(PORT, () => {
    console.log(`App is runnning on ${PORT}`);
});