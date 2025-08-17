const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const connectDb = require('../lib/db');
const jwt = require('jsonwebtoken');

router.post('/register', async(req,res) =>{
    const {username,role,password} = req.body;
    try{
        const db = await connectDb();
        // console.log(db);
        const hash = await  bcrypt.hash(password,10);
        await db.query('insert into users (userName,role,password_hash) values(?,?,?)',[username,role,hash]);
        res.status(200).json({message : "Account is Created Successfully!"});
    } catch(error){
        res.status(500).json({message : error.message});
    }
})

router.post('/login', async(req,res) =>{
    const {username,password} = req.body;
    try{
        const db = await connectDb();
        const [rows] = await db.query('Select * from users where userName = ?',username);
        if(rows.length===0) return res.status(404).json({message : "Account is not created!"});
        if(await bcrypt.compare(password,rows[0].password_hash)){
            const token = generateToken({id : rows[0].user_id});
            res.status(200).json({token : token});
        }
        else{
            res.status(401).json({message : "Password is wrong!"});
        }
    } catch(error){
        res.status(500).json({message : error.message});
    }
})

const generateToken =(payload) =>{
    return jwt.sign(payload,process.env.JWT_KEY,{expiresIn:'30s'});
}



const verifyToken = (req,res,next) =>{
    try{
        const token = req.headers['authorization'].split(' ')[1]; 
        if(!token){
            res.status(403).json({message : "Token is not generated!"});
        }
        const decode = jwt.verify(token,process.env.JWT_KEY);
        req.userId = decode.id;
        next();
    } catch(error){
        res.status(404).json({message : error.message});
    }
}

router.get('/home',verifyToken, async(req,res) =>{
    try{
        const db =await  connectDb();
        // console.log(req.userId);
        const [rows] = await db.query('SELECT * FROM users WHERE user_id=?',req.userId);
        if(rows.length===0) return res.status(404).json({message : "User not Existed!!"});
        return res.status(200).json({user : rows[0]});
    } catch(error){
        res.status(408).json({message : error.message});
    }
})



module.exports = router;