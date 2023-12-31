//  ----------- QUESTION ------------- 

import { IUser } from "@/database/user.model";

export interface GetQuestionsParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
}

export interface CreateQuestionParams {
  title: string;
  content: string;
  tags: string[];
  author: Schema.Types.ObjectId | IUser;
  path: string;
}

export interface GetQuestionByIdParams {
  questionId: string
}

export interface QuestionVoteParams {
  questionId: string;
  userId: string;
  hasUpvoted: boolean;
  hasDownvoted: boolean;
  path: string;
}

export interface QuestionSaveParams {
  questionId: string;
  userId: string;
  // hasSaved: boolean;
  path: string;
}

export interface GetSavedQuestionParams {
  clerkId: string,
  page?: number,
  pageSize?: number,
  filter?: string,
  searchQuery?: string
}


export interface ViewQuestionParams {
  questionId: string;
  userId: string | undefined;
}

export interface GetQuestionsByTagIdParams {
  tagId: string;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
}

export interface DeleteQuestionParams {
  questionId: string
  path: string
}

export interface EditQuestionParams {
  questionId: string;
  title: string;
  content: string;
  path: string;
}

//  ------------- USERS -------------- 

export interface CreateUserParams {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
}

export interface UpdateUserParams {
  clerkId: string;
  updateData: Partial<IUser>;
  path: string;
}

export interface GetUserByIdParams {
  userId: string;
}

export interface DeleteUserParams {
  clerkId: string;
}

export interface GetAllUsersParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string; // Add searchQuery parameter
}

export interface GetUserStatsParams {
  userId: string
  page?: number
  pageSize?: number
}

//  ------------- TAGS -------------- 

export interface GetTopInteractedTags {
  userId: string;
  limit?: number;
}

export interface GetAllTagsParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}

//  ---------  ANSWER  -------------

export interface CreateAnswerParams {
  content: string;
  author: string; // User ID
  question: string; // Question ID
  path: string;
}

export interface GetAnswersParams {
  questionId: string;
  sortBy?: string;
  page?: number;
  pageSize?: number;
}

export interface AnswerVoteParams {
  answerId: string;
  userId: string;
  hasUpvoted: boolean;
  hasDownvoted: boolean;
  path: string;
}

export interface DeleteAnswerParams {
  answerId: string
  path: string
}