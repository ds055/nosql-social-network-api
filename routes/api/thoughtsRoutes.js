const router = require('express').Router();
// pull in controller functions
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtsController');

// /api/thoughts routes
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId routes
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions routes
router.route('/:thoughtId/reactions').post(addReaction).delete(removeReaction);

module.exports = router;
