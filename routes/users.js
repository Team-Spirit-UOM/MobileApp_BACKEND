const express = require('express');
const Users = require('../models/users');
const jwt = require('jsonwebtoken');
const getHashedPassword = require('bcryptjs');
const users = require('../models/users');
const router = express.Router();
// const getHashedPassword = express.bcrypt

//save user
router.post('/user/save',(req,res) =>{
    let newPost = new Users(req.body);

    newPost.save((err) => {
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Post saved successfully"
        });
    });
});

//get users
router.get('/users',(req,res)=>{
    Users.find().exec((err,users)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        
        return res.status(200).json({
            success:true,
            existingPosts:users
        });
    });
});

//get specific
router.get("/user/:id",(req,res) =>{
    let id = req.params.id;
    Users.findById(id,(err,users)=>{
        if(err){
            return res.status(400).json({success:false, err});
           
        }
        return res.status(200).json({
            success:true,
            users
        })
    });
})


//update users
router.put('/user/update/:id',(req,res)=>{
    Users.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,user)=>{
            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Updated Successfully"
            });
        }
    );
});

//Delete user
router.delete('/user/delete/:id',(req,res)=>{
    Users.findByIdAndRemove(req.params.id).exec((err,deletedUser) =>{
        if(err) return res.status(400).json({
            message:"Delete unsuccessful",err
        });
        return res.json({
            message:"Delete Successfull",deletedUser
        });
    });
});

// router.post('/user/login',async (req,res)=>{
//     const { email, password } = req.body;
//     const user = await Users.findOne({ email });
//     if(await bcrypt.compare(enteredPassword, this.password)){
//         return true;
//     }else{
//         return false
//     }

//     // if (user && (await user.matchPassword(password))) {
//     //     return true
//     //   } else {
//     //     // res.status(401);
//     //     return false
//     //     // throw new Error("Invalid Email or Password");
//     //   }

// })

router.post('/user/login',async (req,res)=>{
   
    const user = await Users.findOne({
		email:req.body.email,
	})

	if (!user) {
		return { status: 'error', error: 'Invalid login' }
	}

	// const isPasswordValid = await bcrypt.compare(
	// 	req.body.password,
	// 	user.password
	// )

    const isPasswordValid = Users.find(u => {
        return req.body.email === u.email && password === u.password
    });

	if (isPasswordValid) {
        const token = jwt.sign(
			{
				name: user.firstName,
				email: user.email,
			},
			'secret123'
		)

		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}

})

// const authTokens = {};

// router.post('/user/login', (req, res) => {
//     const { email, password } = req.body;
//     // const hashedPassword = getHashedPassword(password);

    // const user = Users.find(u => {
    //     return u.email === email && password === u.password
    // });

//     if (user) {
//         const authToken = generateAuthToken();
//         // Store authentication token
//         authTokens[authToken] = user;

//         // Setting the auth token in cookies
//         res.cookie('AuthToken', authToken);

//         // Redirect user to the protected page
//         res.redirect('/protected');
//     } else {
//         res.render('login', {
//             message: 'Invalid username or password',
//             messageClass: 'alert-danger'
//         });
//     }
// });


module.exports = router;





