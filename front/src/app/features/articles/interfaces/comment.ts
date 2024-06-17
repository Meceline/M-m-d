export interface Comment {
  id: number;
  content: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
  article: {
    id: number;
    title: string;
    content: string;
  };
  created_at: Date;
  updated_at: Date;
}

// export interface Comment {
//   id: number;
//   content: string;
//   userId: number;
//   username: string;
//   articleId: number;
//   created_at: Date;
//   updated_at: Date;
// }