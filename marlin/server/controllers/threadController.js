const Thread = require('../models/Thread');
const Comment = require('../models/Comment');
const { Dropbox } = require('@dropbox/dropbox-sdk');
const fetch = require('isomorphic-fetch');

const dropbox = new Dropbox({
  accessToken: process.env.DROPBOX_TOKEN,
  fetch: fetch
});

exports.createThread = async (req, res) => {
  try {
    const { board_id, title, content } = req.body;
    let imageUrl = null;

    if (req.file) {
      const filePath = `/uploads/${Date.now()}_${req.file.originalname}`;
      try {
        const response = await dropbox.filesUpload({
          path: filePath,
          contents: req.file.buffer,
          mode: { '.tag': 'add' },
          autorename: true,
          mute: false
        });
        imageUrl = `https://dl.dropboxusercontent.com/s${response.result.path_display}`;
      } catch (err) {
        console.error('Dropbox upload error:', err);
        throw err;
      }
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
