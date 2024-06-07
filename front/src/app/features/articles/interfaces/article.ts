import { Theme } from "../../themes/interfaces/theme";
import { User } from "./user";
import { Comment } from "./comment";

export interface Article {
  id: number;
  title: string;
  content: string;
  user: User;
  theme: Theme;
  comments: Comment[]; 
  created_at: Date;
  updated_at: Date;
}
