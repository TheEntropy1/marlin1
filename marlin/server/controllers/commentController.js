const Comment = require('../models/Comment');
const { Dropbox } = require('@dropbox/dropbox-sdk');
const fetch = require('isomorphic-fetch');

const dropbox = new Dropbox({
  accessToken: process.env.DROPBOX_TOKEN,
  fetch: fetch
});

exports.createComment = async (req, res) => {
  try {
    const { thread_id, content } = req.body;
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

    const commentId = await Comment.create(thread_id, content, imageUrl);
    res.status(201).json({ id: commentId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getThreadComments = async (req, res) => {
  try {
    const comments = await Comment.getByThread(req.params.id);
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
