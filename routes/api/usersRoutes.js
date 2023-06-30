const router = require('express').Router();
// pull in controller functions
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addNewFriend,
    deleteFriend,
} = require('../../controllers/usersController');

// /api/users routes
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId routes
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId routes
router.route('/:userId/friends/:friendId').post(addNewFriend).delete(deleteFriend);

module.exports = router;
