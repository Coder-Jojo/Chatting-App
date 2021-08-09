const router = require('express').Router();
const Message = require('../models/messages') 

router.post('/', async (req, res) => {
    const newMessage = new Message(req.body)

    try {
        const savedMessage = await newMessage.save();
        res.json(savedMessage)
    } catch (error) {
        res.json(error)
    }
})

router.get('/:convoId', async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId : req.params.convoId
        })
        res.json(messages)
    } catch (error) {
        res.json(error)
    }
})

module.exports = router