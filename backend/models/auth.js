const mongoose = require('mongoose');

const AuthSchema = mongoose.Schema(
    {
        username: {
            type: String
        }, 
        name: {
            type: String
        },
        email: {
            type: String
        }, 
        password: {
            type: String
        },
        orgpass: {
            type: String
        }
    },
    {
        timestamps : true,
    }
)

module.exports = mongoose.model('Auth', AuthSchema)