const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        // max length of reaction set to 280 characters
        reactionBody: {
            type: String,
            required: true, 
            maxlength: 280,
        },
        userName: {
            type: String,
            required: true,
        },
        // date returned formatted on query
        createdAt: {
            type: Date,
            default: Date.now,
            get: formattedDate
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
)

// formats date Month, Day, year, time
function formattedDate(date){
    const newDate = date.toLocaleString();
    return newDate;
}

module.exports = reactionSchema;