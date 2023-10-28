


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
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    name: string;
    picture: string;
  };
  upvotes: number;
  views: number;
  answers: Array<object>;
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