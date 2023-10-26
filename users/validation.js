const joi =require('joi')

const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);
const schema=joi.object({
    email:joi.string().email().required(),
    firstname:joi.string().min(3).required(),
    lastname:joi.string().min(3).required(),
    username:joi.string().min(3).required(),
    password:joiPassword
    .string()
    .minOfSpecialCharacters(2)
    .minOfLowercase(2)
    .minOfUppercase(2)
    .minOfNumeric(2)
    .required(),
    phonenumber:joi.string().length(11).pattern(/^[0-9]+$/).required(),
    address:joi.string().required(),
    isAdmin:joi.string()

    
})
module.exports=schema