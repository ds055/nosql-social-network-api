// pull in models
const { User, Thought } = require('../models')

// /api/thoughts
module.exports = {

// GET to get all thoughts
async getThoughts(req, res) {
    try{
        const thoughts = await Thought.find();
        res.json(thoughts)
    } catch (err) {
        res.status(500).json(err);
    }
},

// GET to get a single thought by its _id
async getSingleThought(req, res) {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');
        // if no thoughts exist, alert user
        if (!thought) {
            return res.status(404).json({ message: 'No Thought with that ID' })
        }
        res.json({ thought });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
},

// POST to create a new thought and push id to user's Thought's array
async createThought(req, res) {
    try {
        const thought = await Thought.create(req.body);
        // push new thought to user's array
        const user = await User.findOneAndUpdate(
            {_id: req.body.userId},
            { $push: {thoughts: thought._id }}
        )
        res.json(thought);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
},

// PUT to update a thought by its _id
async updateThought(req, res) {
    try {
        // update Thought with req body
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        );
        // if no thought is found, alert user
        if (!thought) {
            res.status(404).json({ message: 'No Thought with this id!' });
        }
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
},

// DELETE to remove a thought by its _id
async deleteThought(req, res) {
    try {
        const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
        // if no thought found, alert user
        if (!thought) {
            return res.status(404).json({ message: 'No such Thought exists' });
        }
        res.json({ message: 'Thought successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
},


// /api/thoughts/:thoughtId/reactions
// POST to create a reaction stored in a single thought's reactions array field
    async addReaction(req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        );
        // if no thought found, alert user
        if (!thought) {
            return res
                .status(404)
                .json({ message: 'No Thought found with that Id' });
        }
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
    },

// DELETE to pull and remove a reaction by the reaction's reactionId value
    async removeReaction(req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: {reactionId: req.body.reactionId} } },
            { runValidators: true, new: true }
        );
        // if no thought found, alert user
        if (!thought) {
            return res
                .status(404)
                .json({ message: 'No Thought found with that Id' });
        }
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
    },
};