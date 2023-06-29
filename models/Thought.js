const { Schema, Types } = require('mongoose');
const reactionSchema = require('./Reaction')

const thoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true, 
            maxlength: 280,
            minlength: 1,
        },
        userName: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // TODO: * Use a getter method to format the timestamp on query
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
)

thoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
})

const Thought = model('thought', thoughtsSchema);

module.exports = Thought;



