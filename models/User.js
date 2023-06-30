const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        // username must be unique, and white space is trimmed
        userName: {
            type: String,
            unique: true,
            required: true,
            trimmed: true,
        },
        // match uses the regex to ensure entered text matches an email
        email: {
            type: String, 
            required: true,
            unique: true,
            match: [/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/, "Must be a valid email address"]
        },
        // array uses id as reference to keep track of user's thoughts
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        // friends likewise users other User's ids to track connections
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false,
    }
)

// adds friendCount to query 
userSchema.virtual('friendCount').get(function() {
    return this.friends.length
})

const User = model('user', userSchema);

module.exports = User;

