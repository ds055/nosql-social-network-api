const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true, 
            maxlength: 280,
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
    },
    {
        toJSON: {
            getters: true,
        }
    }
)



thoughtsSchema.virtual('timestamp').get(function() {
    
})

module.exports = reactionSchema;