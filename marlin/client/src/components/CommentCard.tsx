import React from 'react';

interface CommentCardProps {
  comment: {
    id: number;
    content: string;
    image_url?: string;
    created_at: string;
  };
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  return (
    <div className="bg-beige-200 p-4 rounded-lg shadow-sm">
      <p className="text-dark-brown-600 mb-3">{comment.content}</p>
      {comment.image_url && (
        <img 
          src={comment.image_url} 
          alt="Comment attachment" 
          className="max-w-xs h-auto rounded mb-3"
        />
      )}
      <div className="text-right text-sm text-dark-brown-500">
        {new Date(comment.created_at).toLocaleString()}
      </div>
    </div>
  );
};

export default CommentCard;