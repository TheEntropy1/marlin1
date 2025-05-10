const Board = require('../models/Board');
const Thread = require('../models/Thread');

exports.getAllBoards = async (req, res) => {
  try {
    const boards = await Board.getAll();
    res.json(boards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBoard = async (req, res) => {
  try {
    const board = await Board.getById(req.params.id);
    if (!board) return res.status(404).json({ error: 'Board not found' });
    res.json(board);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBoardThreads = async (req, res) => {
  try {
    const threads = await Board.getThreads(req.params.id);
    res.json(threads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};