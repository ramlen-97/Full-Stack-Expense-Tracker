const express=require('express');

const app=express();

app.use(express.static('public'));
app.use(express.json());

app.use('/',(req,res)=>{
    res.status(404).send(`<h1>Error 404 : Page not found</h1>`);
})

app.listen(3000,()=>{
    console.log("Server is running");
})