import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentForm from '../components/CommentForm';
import CommentCard from '../components/CommentCard';

interface Thread {
  id: number;
  title: string;
  content: string;
  image_url: string;
  upvotes: number;
  views: number;
  created_at: string;
}

interface Comment {
  id: number;
  content: string;
  image_url: string;
  created_at: string;
}

const ThreadPage: React.FC = () => {
  const { threadId } = useParams();
  const [thread, setThread] = useState<Thread | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    // Fetch thread
    fetch(`/api/threads/${threadId}`)
      .then(res => res.json())
      .then(data => setThread(data));

    // Fetch comments
    fetch(`/api/threads/${threadId}/comments`)
      .then(res => res.json())
      .then(data => setComments(data));
  }, [threadId]);

  if (!thread) return <div>Loading...</div>;

  return (
    <div>
      <div className="bg-beige-200 p-6 rounded-lg shadow-md mb-8">
        <h1 className="text-2xl font-bold text-dark-brown-800 mb-2">{thread.title}</h1>
        <p className="text-dark-brown-600 mb-4">{thread.content}</p>
        {thread.image_url && (
          <img 
            src={thread.image_url} 
            alt="Thread image" 
            className="max-w-full h-auto rounded"
          />
        )}
        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-4">
            <button className="text-dark-brown-600 hover:text-dark-brown-800">
              ▲ {thread.upvotes}
            </button>
          </div>
          <span className="text-sm text-dark-brown-500">
            {new Date(thread.created_at).toLocaleString()}
          </span>
        </div>
      </div>

      <CommentForm threadId={threadId} />

      <div className="space-y-4 mt-8">
        {comments.map(comment => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default ThreadPage;