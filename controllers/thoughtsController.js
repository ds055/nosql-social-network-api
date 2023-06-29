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

        if (!thought) {
            return res.status(404).json({ message: 'No Thought with that ID' })
        }

        res.json({ thought });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
},

// POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
async createThought(req, res) {
    try {
        const thought = await Thought.create(req.body);

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
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        );

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

        if (!thought) {
            return res
                .status(404)
                .json({ message: 'No Thought found with that ID :(' });
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
            { $pull: { reactions: req.body.reactionId } },
            { runValidators: true, new: true }
        );

        if (!thought) {
            return res
                .status(404)
                .json({ message: 'No Thought found with that ID :(' });
        }

        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
    },
};