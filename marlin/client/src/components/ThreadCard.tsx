import React from 'react';
import { Link } from 'react-router-dom';

interface ThreadCardProps {
  id: number;
  title: string;
  content: string;
  upvotes: number;
  views: number;
  createdAt: string;
}

const ThreadCard: React.FC<ThreadCardProps> = ({
  id,
  title,
  content,
  upvotes,
  views,
  createdAt,
}) => {
  return (
    <Link to={`/thread/${id}`}>
      <div className="bg-beige-200 p-4 rounded-lg shadow-sm hover:bg-beige-300 transition-colors">
        <h4 className="font-semibold text-dark-brown-800">{title || 'Untitled'}</h4>
        <p className="text-dark-brown-600 line-clamp-2 my-2">{content}</p>
        <div className="flex justify-between text-sm text-dark-brown-500">
          <div className="flex space-x-3">
            <span>▲ {upvotes}</span>
            <span>👁️ {views}</span>
          </div>
          <span>{new Date(createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </Link>
  );
};

export default ThreadCard;