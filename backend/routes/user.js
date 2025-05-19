const express = require('express');
const zod = require('zod');
const router = express.Router();
import { JWT_SECRET } from '../config';
import { Account, User } from '../db';
const jwt = require('jsonwebtoken');
const {authMiddleware} = require('../middleware');

const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})

router.post('/signup', async (req, res) => {
    const { inputPayload } = signupSchema.safeParse(req.body);
    if (!inputPayload) {
        return res.status(411).json({
            msg: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            msg: " user already exist"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })

   
    const userId = user._id;
     await Account.create({
        userId,
        balance: 1+ Math.random()*10000
    })
    
    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        token: token,
        msg: "User Created Successfully"
    })
});

    const siginSchema = zod.object({
        username: zod.string().email(),
        password: zod.string()
});

router.post('/signin', async (req, res) => {
    const {inputPayload} = siginSchema.safeParse(req.body);

    if(!inputPayload){
        return res.status(411).json({
            msg: "email already taken / Incorrect Input"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if(user){
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
        res.json({
    token: token
})
return;
    }

    res.status(411).json({
        msg: "Error while logging "
    })
});

const updateSchema = zod.object({
    password : zod.string().optional(),
    firstName : zod.string().optional(),
    lastName : zod.string().optional()
})
router.put('/', authMiddleware, async (req, res) => {
    const {inputPayload} = updateSchema.safeParse(req.body);

    if(!inputPayload){
        res.status(411).json({
            msg: " Error while updating information"
        })
    }
    await User.updateOne(req.body, {
        _id: req.userId
    });
    
    res.json({
        msg: "Successfully updated"
    })
})

router.get('/bulk', async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                $regex: filter
            }
        },{
            lastName:{
                $regex: filter
            }
        }]
    })

    res.status(200).json({
        user: users.map(user =>({
            username: user.username,
            firstName : user.firstName,
            lastName: user.lastName,
            _id : user._id
        }))
    })
});  

module.exports = router;