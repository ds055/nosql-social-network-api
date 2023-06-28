const { Schema, Types } = require('mongoose');

const userSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        userName: {
            type: String,
            unique: true,
            required: true,
            trimmed: true,
        },
        email: {
            type: String, 
            required: true,
            unique: true,
            match: [/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/, "Must be a valid email address"]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
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

userSchema.virtual('friendCount').get(function() {
    return this.friends.length
})


const User = model('user', userSchema);

module.exports = User;

