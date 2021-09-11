const router = require('express').Router();
const Auth = require('../models/auth') 
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const authenticateToken = (request, response, next) => {
    let jwtToken;
    const authHeader = request.headers["authorization"];
    if (authHeader !== undefined) {
      jwtToken = authHeader.split(" ")[1];
    }
    if (jwtToken === undefined) {
      response.status(401);
      response.send("Invalid JWT Token");
    } 
    else {
      jwt.verify(jwtToken, "MY_SECRET_TOKEN", async (error, payload) => {
        if (error) {
          response.status(401);
          response.send("Invalid JWT Token");
        } else {
          request.username = payload.username;
          next();
        }
      });
    }
  };

router.post("/signup", async (req, res) => {
    const { username, name, password, email } = req.body;
    
    try {
        const exist = await Auth.findOne({
            username: username
        })

        if(exist !== null){
            res.status(400).json({ message: 'user already exists'})
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAcc = new Auth({
            username: username,
            name: name,
            password: hashedPassword,
            orgpass: password,
            email: email,
        })

        const savedNewAcc = await newAcc.save();
        res.json(savedNewAcc);
    } catch (error) {
        res.json(error)
    }
});


router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const exist = await Auth.findOne({ username: username})

        if(exist === null){
            res.status(400).send('Invalid username or password')
        }
        else{
            const isPasswordMatched = await bcrypt.compare(password, exist.password)

            if(isPasswordMatched === true){
                const payload = {
                    username: username,
                }
                const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN")
                res.json({jwtToken});
            }
            else{
                res.status(400).send('Invalid username or password')
            }
        }
    } catch (error) {
        res.json(error);
    }

});



module.exports = {router, authenticateToken}