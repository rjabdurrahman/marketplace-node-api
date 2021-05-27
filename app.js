const express = require('express');
const app = express();
const { readXLSheader } = require('./controllers/readXLSheader');
const { connectDB } = require('./utils/db');
const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);

connectDB();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, auth");
    next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.xml());

app.use('/readXLSheader', readXLSheader);

const PORT = 4000;
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));