const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const {connectMongoDB}= require('./connect');
const { restrictToLoggedinUserOnly, checkAuth } = require("./middleware/auth");

const app = express();
const port = 3001;

const urlRouter = require('./routes/url');
const staticRouter = require('./routes/staticRouter');
const userRoute = require('./routes/user.js');

connectMongoDB('mongodb://localhost:27017/shorturl')
  .then(() => {
    console.log('Connected to MongoDB');
  });

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cookieParser());

app.use('/url', restrictToLoggedinUserOnly, urlRouter);
app.use('/',checkAuth, staticRouter);
app.use('/signup', staticRouter);
app.use('/user', userRoute);

app.set('view engine', 'ejs');
app.set("views", path.resolve("./views"));


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});