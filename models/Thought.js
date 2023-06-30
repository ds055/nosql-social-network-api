const { Schema, model } = require('mongoose');
// pull in reaction Schema to be able to add to a array
const reactionSchema = require('./Reaction')

const thoughtsSchema = new Schema(
    {
        // sets params on Thought to 1-280 characters
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
        // returns formatted date on query
        createdAt: {
            type: Date,
            default: Date.now,
            get: formattedDate
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

// formates date to Month, Day, Year, Time for query
function formattedDate(date){
    const newDate = date.toLocaleString();
    return newDate;
}

// counts number of reactions a Thought has
thoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
})

const Thought = model('thought', thoughtsSchema);

module.exports = Thought;



