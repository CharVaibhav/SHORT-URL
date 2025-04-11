const express = require('express');
const path = require('path');
const {connectMongoDB}= require('./connect');
const urlRouter = require('./routes/url');
const staticRouter = require('./routes/staticRouter');

const app = express();
const port = 3001;

connectMongoDB('mongodb://localhost:27017/shorturl')
  .then(() => {
    console.log('Connected to MongoDB');
  });

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use('/url', urlRouter);
app.use('/', staticRouter);

app.set('view engine', 'ejs');
app.set("views", path.resolve("./views"));


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});