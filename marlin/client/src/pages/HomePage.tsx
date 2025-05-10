import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ThreadCard from '../components/ThreadCard';

interface Thread {
  id: number;
  title: string;
  content: string;
  upvotes: number;
  views: number;
  created_at: string;
}

const BoardPage: React.FC = () => {
  const { boardId } = useParams();
  const [threads, setThreads] = useState<Thread[]>([]);
  const [boardName, setBoardName] = useState('');

  useEffect(() => {
    // Fetch board details
    fetch(`/api/boards/${boardId}`)
      .then(res => res.json())
      .then(data => setBoardName(data.name));

    // Fetch threads
    fetch(`/api/boards/${boardId}/threads`)
      .then(res => res.json())
      .then(data => setThreads(data));
  }, [boardId]);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-dark-brown-800">/{boardName}/</h1>
        <Link 
          to={`/board/${boardId}/new`}
          className="bg-dark-brown-600 text-beige-100 px-4 py-2 rounded hover:bg-dark-brown-700"
        >
          New Thread
        </Link>
      </div>

      <div className="space-y-4">
        {threads.map(thread => (
          <ThreadCard 
            key={thread.id}
            id={thread.id}
            title={thread.title}
            content={thread.content}
            upvotes={thread.upvotes}
            views={thread.views}
            createdAt={thread.created_at}
          />
        ))}
      </div>
    </div>
  );
};

export default BoardPage;