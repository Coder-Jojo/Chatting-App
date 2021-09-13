const router = require('express').Router();
const Conversation = require('../models/conversations') 

router.post('/', async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    })

    try {
        const savedConversation = await newConversation.save();
        res.json(savedConversation)
    } catch (error) {
        res.json(error)
    }
})

router.get('/:userId', async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members : { $in : [req.params.userId] }
        })
        res.json(conversation)
    } catch (error) {
        res.json(error)
    }
})

router.get('/find/:user1/:user2', async (req, res) => {
    try {
        const conversation = await Conversation.findOne({
            members : { $all : [req.params.user1, req.params.user2] }
        })

        if(conversation === null){
            const newConversation = new Conversation({
                members: [req.params.user1, req.params.user2]
            })
            const savedConversation = await newConversation.save()
            res.json(savedConversation)
        }
        else{
            res.json(conversation)
        }
    }
    catch(err){
        console.log(err)
    }
})

router.delete('/:convoId', async (req, res) => {
    try {
        const resp = await Conversation.deleteOne({
            _id : req.params.convoId
        })
        console.log(resp);
        res.status(200).json(resp)
    } catch (err) {
        console.log(err)
    }
})

module.exports = router