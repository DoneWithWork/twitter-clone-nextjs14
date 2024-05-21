import { User } from "@prisma/client";

export type PostCardProps = {
  user: UserType;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  content: string;
  userId: string;
};
export type UserType = {
  id: string;
  imageUrl: string;
  username: string;
};
