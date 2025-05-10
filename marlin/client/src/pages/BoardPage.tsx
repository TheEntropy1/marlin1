// client/src/pages/BoardPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ThreadCard from '../components/ThreadCard';
import { fetchThreads, createThread } from '../services/api';
import { Thread } from '../types';

const BoardPage: React.FC = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const [threads, setThreads] = useState<Thread[]>([]);
  const [boardName, setBoardName] = useState('');
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newThreadContent, setNewThreadContent] = useState('');
  const [isCreatingThread, setIsCreatingThread] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBoardData = async () => {
      try {
        const [boardData, threadData] = await Promise.all([
          fetch(`/api/boards/${boardId}`).then(res => res.json()),
          fetch(`/api/boards/${boardId}/threads`).then(res => res.json())
        ]);
        setBoardName(boardData.name);
        setThreads(threadData);
      } catch (error) {
        console.error('Error loading board:', error);
      }
    };

    loadBoardData();
  }, [boardId]);

  const handleCreateThread = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreatingThread(true);
    try {
      const newThread = await createThread({
        boardId: boardId!,
        title: newThreadTitle,
        content: newThreadContent
      });
      setThreads([newThread, ...threads]);
      setNewThreadTitle('');
      setNewThreadContent('');
      navigate(`/thread/${newThread.id}`);
    } catch (error) {
      console.error('Error creating thread:', error);
    } finally {
      setIsCreatingThread(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-dark-brown-800">/{boardName}/</h1>
        <Link 
          to={`/board/${boardId}/threads`}
          className="bg-dark-brown-600 text-beige-100 px-4 py-2 rounded hover:bg-dark-brown-700"
        >
          View All Threads
        </Link>
      </div>

      <div className="bg-beige-200 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 text-dark-brown-800">Create New Thread</h2>
        <form onSubmit={handleCreateThread}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Thread Title"
              className="w-full px-3 py-2 border border-dark-brown-300 rounded"
              value={newThreadTitle}
              onChange={(e) => setNewThreadTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Your post content"
              className="w-full px-3 py-2 border border-dark-brown-300 rounded"
              rows={4}
              value={newThreadContent}
              onChange={(e) => setNewThreadContent(e.target.value)}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-dark-brown-600 text-beige-100 px-4 py-2 rounded hover:bg-dark-brown-700 disabled:opacity-50"
            disabled={isCreatingThread}
          >
            {isCreatingThread ? 'Posting...' : 'Create Thread'}
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {threads.map((thread) => (
          <ThreadCard
            key={thread.id}
            id={thread.id}
            title={thread.title}
            content={thread.content}
            upvotes={thread.upvotes}
            views={thread.views}
            createdAt={thread.created_at}
            imageUrl={thread.image_url}
          />
        ))}
      </div>
    </div>
  );
};

export default BoardPage;
