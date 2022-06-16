const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    estimatedTime:{
        type:Number,
    },
    availability:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Posts',postSchema);

//food