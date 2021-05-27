const express = require('express');
const app = express();
const { readXLSheader } = require('./controllers/readXLSheader');
const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, auth");
    next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.xml());

app.use('/readXLSheader', readXLSheader);

const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));