const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema(
    {
        username: String
    },
    {
        timestamps : true,
    }
)

module.exports = mongoose.model('Users', UsersSchema)