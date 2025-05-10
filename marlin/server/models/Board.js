const db = require('../database');

class Board {
  static getAll() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM boards ORDER BY name', (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM boards WHERE id = ?', [id], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  }

  static getThreads(boardId) {
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
}

module.exports = Board;