export interface Article {
  id: number;
  title: string;
  content: string;
  user: {
    id: number;
    username: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
  };
  theme: {
    id: number;
    title: string;
    description: string;
    created_at: Date;
    updated_at: Date;
  };
  created_at: Date;
  updated_at: Date;
}
