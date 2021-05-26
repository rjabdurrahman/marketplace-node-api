const express = require('express');
const app = express();
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const proposalRoutes = require('./routes/proposal');
const { connectDB } = require('./utils/db');

connectDB();
// Middlewares
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, auth");
    next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/proposal', proposalRoutes);

const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));