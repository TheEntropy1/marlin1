import React from 'react';
import { Link } from 'react-router-dom';
import { Thread } from '../types';

interface ThreadCardProps extends Thread {}

const ThreadCard: React.FC<ThreadCardProps> = ({
  id,
  title,
  content,
  upvotes,
  views,
  createdAt,
  imageUrl,
}) => {
  return (
    <Link to={`/thread/${id}`}>
      <div className="bg-beige-200 p-4 rounded-lg shadow-sm hover:bg-beige-300 transition-colors h-full">
        <h3 className="font-semibold text-dark-brown-800">
          {title || 'Untitled Thread'}
        </h3>
        <p className="text-dark-brown-600 line-clamp-2 my-2">{content}</p>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Thread thumbnail"
            className="w-full h-32 object-cover rounded mb-2"
          />
        )}
        <div className="flex justify-between text-sm text-dark-brown-500 mt-2">
          <span>▲ {upvotes} upvotes</span>
          <span>{new Date(createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </Link>
  );
};

export default ThreadCard;
