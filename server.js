require('./db')
require("express-async-errors")
const express = require("express");
const dotenv = require("dotenv");
require("dotenv").config();
const app = express();
const port = 3000;
const fs = require("fs");
const router = express.Router();
const userRouter = require('./users/userRouter');
app.use(express.json());
app.use(['/users' , "/user"], userRouter);



////error handling 

app.use((err , req ,res ,next)=>{
    res.status(401).send({
        message : err.message
    })
})

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});
