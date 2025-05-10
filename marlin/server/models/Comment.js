const db = require('../database');

class Comment {
  static create(threadId, content, imageUrl = null) {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO comments (thread_id, content, image_url) VALUES (?, ?, ?)',
        [threadId, content, imageUrl],
        function(err) {
          if (err) return reject(err);
          resolve(this.lastID);
        }
      );
    });
  }

  static getByThread(threadId) {
    return new Promise((resolve, reject) => {
      db.all(
        'SELECT * FROM comments WHERE thread_id = ? ORDER BY created_at ASC',
        [threadId],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        }
      );
    });
  }
}

module.exports = Comment;