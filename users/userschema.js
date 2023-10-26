const mongoose = require("mongoose");
const bcrypt=require('bcrypt')
const dotenv = require("dotenv");
require("dotenv").config();
const saltRound=12;
const util=require('util')
const jwi=require('jsonwebtoken');
const _ = require('lodash')
const asycasign=util.promisify(jwi.sign)

const secrtkey= process.env.secrtkey


const userSchema = mongoose.Schema({
    firstname :{
        type:String,
        required:true
    }, 
    lastname:{
        type:String,
        required:true
    } ,
    username:{
        type:String,
        required:true
    } ,
    password:{
        type:String,
        required:true
    } ,
    phonenumber:{
        type:String,
        required:true
    } ,
    email:{
        type:String,
        required:true
    } ,
    address:{
        type:String,
        required:true
    },
    role:{
        type : String,
        required:true,
        enum : ['admin','user'],
        default:'user'
    },
    cart:{
    type:[String] 
    }
},{toJSON:{
    transform:(doc,returndoc)=> _.omit(returndoc,['__v','Password'])
    }
})
    //if update password =>new pass will be hashed
    //Hooks mongoose
    userSchema.pre('save',async function(){
    if(this.isModified('password')){
        const hashedpass=await bcrypt.hash(this.password,saltRound)
        this.password=hashedpass
    }
    })

userSchema.methods.generateToken=function(){
    const token= asycasign({
            //playload
            id:this.id,
            username:this.username ,
            isAdmin:this.isAdmin 
        },secrtkey)
        return token
}
const usermodel = mongoose.model("user", userSchema)
module.exports = usermodel