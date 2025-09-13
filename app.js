const express = require('express');

const db = require('./utils/db-connection');
const userRoutes = require('./routes/user');
const expenseRoutes=require('./routes/expense')

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.use('/user', userRoutes);
app.use('/expense',expenseRoutes)

app.use('/', (req, res) => {
    res.status(404).send(`<h1>Error 404 : Page not found</h1>`);
})


db.sync().then(() => {
    app.listen(3000, () => {
        console.log("Server is running");
    })
}).catch((error) => {
    console.log(error);
})
