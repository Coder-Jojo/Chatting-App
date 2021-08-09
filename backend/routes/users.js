const router = require('express').Router();
const User = require('../models/users') 

router.post('/:user', async (req, res) => {
    try{
        const newUser = new User({
            username : req.params.user
        })
        const resp = await newUser.save()
        res.json(resp)
    }
    catch(err){
        console.log(err)
    }
})

router.get('/', async (req, res) => {
    try {
        const users = await User.find({})
        res.json(users)
    } catch (error) {
        console.log(error)
    }
})

router.get('/find/:id', async (req, res) => {
    try{
        const user = await User.findOne({_id: req.params.id})
        res.json(user)
    }
    catch(err){
        console.log(err)
    }
})

router.get('/:user', async (req, res) => {
    try{
        const user = await User.findOne({
            username: req.params.user
        })

        if(user === null){
            const newUser = await User({
                username: req.params.user
            })
            await newUser.save()
            const find = await User.findOne({
                username: req.params.user
            })
            res.json(find)
        }
        else{
            res.json(user)
        }
    }
    catch(err){
        console.log(err)
    }
})

module.exports = router