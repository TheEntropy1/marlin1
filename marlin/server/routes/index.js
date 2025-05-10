const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const boardController = require('../controllers/boardController');
const threadController = require('../controllers/threadController');
const commentController = require('../controllers/commentController');

// Board routes
router.get('/boards', boardController.getAllBoards);
router.get('/boards/:id', boardController.getBoard);
router.get('/boards/:id/threads', boardController.getBoardThreads);

// Thread routes
router.post('/threads', upload.single('image'), threadController.createThread);
router.get('/threads/:id', threadController.getThread);
router.post('/threads/:id/upvote', threadController.upvoteThread);

// Comment routes
router.post('/threads/:id/comments', upload.single('image'), commentController.createComment);
router.get('/threads/:id/comments', commentController.getThreadComments);

module.exports = router;