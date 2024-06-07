import { User } from "./user";

export interface Comment {
    id: number;
    content: string;
    user: User; 
    created_at: Date;
    updated_at: Date;
  }