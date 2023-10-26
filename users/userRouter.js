const express=require("express")
const fs=require('fs/promises')
const router=express.Router()

const customError = require("../CustomError");
const usermodel = require("../users/userschema");
const schema=require("./validation")
const bcrypt=require("bcrypt")
const saltRound=12;
const util=require('util')
const jwi=require('jsonwebtoken');
const asycasign=util.promisify(jwi.sign)



// sign up
router.post("/signup" ,async (req, res, next) => {

    const { error } = schema.validate(req.body);
    if (error) {
    const errorMessage = `Validation error: ${error.details[0].message}`;
    return res.status(400).send(errorMessage);
    }

    let { email,firstname,lastname,username,password,phonenumber,address,isAdmin} = req.body;
    const userexite=await usermodel.findOne({username})
    if(userexite){
        next(customError({
            statusCode:401,
            message:"User is exist enter another user"
        }))
    }
else{
    const newuser = await usermodel.create({
        email,firstname,lastname,username,password,phonenumber,address,isAdmin
    });
    res.status(200).send(newuser);
}
});

//login 
router.post("/login" ,async (req, res, next) => {
    const{username,password}=req.body
    const finduser=await usermodel.findOne({username})
    if(!finduser){
        next(customError({
            statusCode:401,
            message:"User or password invalid"
        }))
    }
    const passcompar=await bcrypt.compare(password,finduser.password)
    if(!passcompar){
        next(customError({
                statusCode:401,
                message:"User or password invalid"
            }))
    }
    const token=await finduser.generateToken()
    if(!token){
        next(customError({
            statusCode:401,
            message:"User or password invalid"
        }))
    }
    let urId = await finduser.id
    res.send({urId,token}) 
})
module.exports=router