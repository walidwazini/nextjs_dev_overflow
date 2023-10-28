


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

// todo : Prop types not finalized
// todo : all _id need to change to type string
export interface QuestionCardProps {
  _id: number;
  text: string;
  tags: {
    _id: number;
    name: string;
  }[];
  author: {
    _id: number;
    name: string;
  };
  upvotes: number;
  views: number;
  answers: number
  createdAt: string;
}