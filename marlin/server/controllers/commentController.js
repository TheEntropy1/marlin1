const Comment = require('../models/Comment');
const { Dropbox } = require('@dropbox/dropbox-sdk');
const dropbox = new Dropbox({ accessToken: process.env.DROPBOX_TOKEN });({
  token: process.env.DROPBOX_TOKEN
});

exports.createComment = async (req, res) => {
  try {
    const { thread_id, content } = req.body;
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
