const db = require('../database');

class Thread {
  static create(boardId, title, content, imageUrl = null) {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO threads (board_id, title, content, image_url) VALUES (?, ?, ?, ?)',
        [boardId, title, content, imageUrl],
        function(err) {
          if (err) return reject(err);
          resolve(this.lastID);
        }
      );
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM threads WHERE id = ?', [id], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  }

  static getByBoard(boardId) {
    return new Promise((resolve, reject) => {
      db.all(
        'SELECT * FROM threads WHERE board_id = ? ORDER BY created_at DESC',
        [boardId],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        }
      );
    });
  }

  static incrementViews(id) {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE threads SET views = views + 1 WHERE id = ?',
        [id],
        (err) => {
          if (err) return reject(err);
          resolve();
        }
      );
    });
  }

  static upvote(id) {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE threads SET upvotes = upvotes + 1 WHERE id = ?',
        [id],
        (err) => {
          if (err) return reject(err);
          resolve();
        }
      );
    });
  }

  static deleteOldThreads() {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    return new Promise((resolve, reject) => {
      db.run(
        'DELETE FROM threads WHERE created_at < ? AND upvotes < 5 AND views < 50',
        [oneMonthAgo.toISOString()],
        function(err) {
          if (err) return reject(err);
          resolve(this.changes);
        }
      );
    });
  }
}

module.exports = Thread;