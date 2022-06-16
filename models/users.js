const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
      
    },
    lastName:{
        type:String,
       
    },
    image:{
        type:String
    },
    email:{
        type:String,
       
    },
    contact:{
        type:String,
       
    },
    password:{
        type:String,
      
    },
    
}


);


  
module.exports = mongoose.model('users',userSchema);