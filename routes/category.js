const express = require('express');
const categorys = require('../models/category');

const router = express.Router();

//get posts
router.get('/categorys',(req,res)=>{
    categorys.find().exec((err,categorys)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        
        return res.status(200).json({
            success:true,
            existingCategorys:categorys
        });
    });
});

module.exports = router; 