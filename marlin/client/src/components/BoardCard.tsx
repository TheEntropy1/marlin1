import React from 'react';

interface BoardCardProps {
  name: string;
  description: string;
  isNsfw: boolean;
}

const BoardCard: React.FC<BoardCardProps> = ({ name, description, isNsfw }) => {
  return (
    <div className="bg-beige-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-dark-brown-800">/{name}/</h3>
        {isNsfw && (
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
            NSFW
          </span>
        )}
      </div>
      <p className="mt-2 text-dark-brown-600">{description}</p>
    </div>
  );
};

export default BoardCard;