// Pull in models
const { User, Thought } = require('../models')

// /api/users routes--exports for use in routes
module.exports = {

// GET all users
async getUsers(req, res) {
    try{
        const users = await User.find();
        res.json(users)
    } catch (err) {
        res.status(500).json(err);
    }
},

// GET a single user by its _id and populated thought and friend data
async getSingleUser(req, res) {
    try {
        const user = await User.findOne({ _id: req.params.userId })
            .select('-__v');
        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' })
        }
        res.json({ user });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
},

// POST a new user:
async createUser(req, res) {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
},

// PUT to update a user by its _id
async updateUser(req, res) {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        );
        if (!user) {
            res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
},

// DELETE to remove user by its _id
// BONUS: Remove a user's associated thoughts when deleted.
async deleteUser(req, res) {
    try {
        const user = await User.findOneAndRemove({ _id: req.params.userId });
        // if profile doesn't exist, alert user
        if (!user) {
            return res.status(404).json({ message: 'No such user exists' });
        }
        // Add profile's thoughts to array
        const thoughtsIdArr = user.thoughts
        // delete thoughts from the array
        const thoughts = await Thought.deleteMany(
            { _id: { $in: thoughtsIdArr }},
        );
        // if profile has no thoughts, return notification to user
        if (!thoughts) {
            return res.status(404).json({
            message: 'User deleted, but no Thoughts found',
            });
        }
        res.json({ message: 'User successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
},


// /api/users/:userId/friends/:friendId
// POST to add a new friend to a user's friend list
async addNewFriend(req, res) {
try {
    const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
    );
    // if no profile exists, alert user
    if (!user) {
        return res
            .status(404)
            .json({ message: 'No user found with that Id' });
    }
    res.json(user);
} catch (err) {
    res.status(500).json(err);
}},

// DELETE to remove a friend from a user's friend list
async deleteFriend(req, res) {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );
        // if no profile exists, alert user
        if (!user) {    
            return res
                .status(404)
                .json({ message: 'No user found with that Id' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
    },
};