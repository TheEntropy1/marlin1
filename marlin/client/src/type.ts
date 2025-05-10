// client/src/types.ts
export interface Thread {
  id: string;
  boardId: string;
  title: string;
  content: string;
  upvotes: number;
  views: number;
  created_at: string;
  image_url?: string;
}

export interface Board {
  id: string;
  name: string;
  description: string;
  is_nsfw: boolean;
}
