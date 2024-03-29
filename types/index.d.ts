

export interface SidebarLink {
  imgURL: string;
  route: string;
  label: string;
}

export interface CustomInputProps {
  route: string,
  iconPosition: string,
  imgSrc: string,
  placeholder: string,
  otherClasses: string
}

interface NoResultProps {
  title: string
  description: string
  link: string
  linkTitle: string
}

export interface QuestionCardProps {
  _id: string;
  clerkId?: string | null
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    name: string;
    picture: string;
    clerkId: string
  };
  upvotes: number;
  views: number;
  answers: Array<object>;
  createdAt: Date;
}

export interface AnswerCardProps {
  clerkId?: string | null;
  _id: string;
  question: {
    _id: string;
    title: string;
    createdAt: Date
  };
  content: string
  author: {
    _id: string;
    clerkId: string;
    name: string;
    picture: string;
  };
  upvotes: number;
  createdAt: Date;
}

export interface MetricProps {
  imgUrl: string,
  alt: string,
  value: string | number,
  title: string,
  href?: string,
  textStyles: string,
  isAuthor?: boolean,
}

export interface VotingBarProps {
  type: string,
  itemId: string,
  userId: string,
  upvotes: number,
  hasUpvoted: boolean,
  downvotes: number,
  hasDownvoted: boolean,
  hasSaved?: boolean
}

export interface URLProps {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}

export interface ProfileLinkProps {
  imgUrl: string,
  href?: string,
  title: string
}

export interface StatsProps {
  totalQuestions: number,
  totalAnswers: number
}

export interface StatsCardProps {
  imgUrl: string
  value: number
  title: string
}

export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

export interface QuestionTabProps extends SearchParamsProps {
  userId: string
  clerkId?: string
}

export interface AnswerTabProps extends SearchParamsProps {
  userId: string
  clerkId?: string
}

export interface EditDeleteBarProps {
  type: 'question' | 'answer'
  itemId: string
}

export interface ProfileFormProps {
  clerkId: string
  user: string
}

export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined }
}