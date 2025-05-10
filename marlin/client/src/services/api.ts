export const fetchThreads = async (boardId: string): Promise<Thread[]> => {
  const response = await fetch(`/api/boards/${boardId}/threads`);
  return await response.json();
};

export const createThread = async (threadData: {
  boardId: string;
  title: string;
  content: string;
}): Promise<Thread> => {
  const response = await fetch('/api/threads', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(threadData),
  });
  return await response.json();
};
