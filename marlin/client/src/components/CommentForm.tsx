import React, { useState } from 'react';

interface CommentFormProps {
  threadId: string | undefined;
}

const CommentForm: React.FC<CommentFormProps> = ({ threadId }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('content', content);
    if (image) formData.append('image', image);

    try {
      const response = await fetch(`/api/threads/${threadId}/comments`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setContent('');
        setImage(null);
        // Refresh comments
        window.location.reload();
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="mb-4">
        <textarea
          className="w-full px-3 py-2 border border-dark-brown-300 rounded"
          rows={4}
          placeholder="Write your comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-dark-brown-600 mb-2">Image (optional)</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-dark-brown-600 text-beige-100 px-4 py-2 rounded hover:bg-dark-brown-700"
      >
        Post Comment
      </button>
    </form>
  );
};

export default CommentForm;