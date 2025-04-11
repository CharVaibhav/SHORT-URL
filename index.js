const express = require('express');
const {connectMongoDB}= require('./connect');
const urlRouter = require('./routes/url');

const app = express();
const port = 3001;

connectMongoDB('mongodb://localhost:27017/shorturl')
  .then(() => {
    console.log('Connected to MongoDB');
  });

app.use(express.json());
app.use('/url', urlRouter);


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});