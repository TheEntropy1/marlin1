const Thread = require('../models/Thread');
const Comment = require('../models/Comment');
const dropbox = require('dropbox-v2-api').authenticate({
  token: process.env.DROPBOX_TOKEN
});

exports.createThread = async (req, res) => {
  try {
    const { board_id, title, content } = req.body;
    let imageUrl = null;

    if (req.file) {
      const filePath = `/uploads/${Date.now()}_${req.file.originalname}`;
      await new Promise((resolve, reject) => {
        dropbox({
          resource: 'files/upload',
          parameters: {
            path: filePath,
            mode: 'add',
            autorename: true,
            mute: false
          },
          readStream: req.file.buffer
        }, (err, result) => {
          if (err) return reject(err);
          imageUrl = `https://dl.dropboxusercontent.com/s${result.path_display}`;
          resolve();
        });
      });
    }

    const threadId = await Thread.create(board_id, title, content, imageUrl);
    res.status(201).json({ id: threadId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getThread = async (req, res) => {
  try {
    const thread = await Thread.getById(req.params.id);
    if (!thread) return res.status(404).json({ error: 'Thread not found' });
    
    // Increment view count
    await Thread.incrementViews(req.params.id);
    
    res.json(thread);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.upvoteThread = async (req, res) => {
  try {
    await Thread.upvote(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};