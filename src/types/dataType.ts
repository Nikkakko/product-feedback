export type ProductRequestReply = {
  content: string;
  replyingTo?: string;
  user: {
    image: string;
    name: string;
    username: string;
  };
};

export type ProductRequestComment = {
  id: number;
  content: string;
  user: {
    image: string;
    name: string;
    username: string;
  };
  replies?: ProductRequestReply[];
};

export type ProductRequest = {
  id: number;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  comments?: ProductRequestComment[];
};

export type product = {
  id: number;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  comments?: ProductRequestComment[];
};

export type ProductRequestsData = ProductRequest[];
