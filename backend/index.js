const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const authorsRouter = require('./routes/authors');
const booksRouter = require('./routes/books');
const readersRouter = require('./routes/readers');

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/authors', authorsRouter);
app.use('/books', booksRouter);
app.use('/readers', readersRouter);

db = require('./config/db');

const port = Number(process.env.port || 4000)
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});
