const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');
const dropbox = require('dropbox-v2-api').authenticate({
  token: process.env.DROPBOX_TOKEN
});

// Delete threads older than 1 month with less than 5 upvotes and less than 50 views
const oneMonthAgo = new Date();
oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

db.all(`
  SELECT id, image_url FROM threads 
  WHERE created_at < ? AND upvotes < 5 AND views < 50
`, [oneMonthAgo.toISOString()], (err, threads) => {
  if (err) throw err;

  threads.forEach(thread => {
    // Delete from Dropbox
    if (thread.image_url) {
      const filePath = thread.image_url.split('/').pop();
      dropbox({
        resource: 'files/delete',
        parameters: { path: `/uploads/${filePath}` }
      }, (err) => {
        if (err) console.error('Error deleting file from Dropbox:', err);
      });
    }

    // Delete from database
    db.run('DELETE FROM threads WHERE id = ?', [thread.id]);
    db.run('DELETE FROM comments WHERE thread_id = ?', [thread.id]);
  });
});

db.close();