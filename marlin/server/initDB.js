const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

// Create boards
db.serialize(() => {
  // Remove Japanese culture boards
  const boards = [
    // Interests
    { name: 'Comics & Cartoons', description: 'Discussion about comics and cartoons' },
    { name: 'Technology', description: 'Tech news and discussions' },
    // ... add all other boards except Japanese culture
    
    // Your requested boards
    { name: 'Russian Women', description: 'Discussion about Russian women' },
    { name: 'Russian Beauty', description: 'Beauty and fashion from Russia' },
    { name: 'Pune', description: 'Everything about Pune city' },
    
    // Adult boards
    { name: 'Sexy Beautiful Women', description: 'NSFW content', is_nsfw: 1 },
    // ... other adult boards
  ];

  const stmt = db.prepare('INSERT INTO boards (name, description, is_nsfw) VALUES (?, ?, ?)');
  boards.forEach(board => {
    stmt.run(board.name, board.description, board.is_nsfw || 0);
  });
  stmt.finalize();

  console.log('Database initialized with boards');
});

db.close();