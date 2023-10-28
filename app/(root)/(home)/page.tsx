import Image from "next/image";
import ThemeButton from "@/components/DemoThemeButton";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Filter, LocalSearchbar, NoResult, QuestionCard } from "@/components/shared";
import { HomePageFilters } from "@/constants/filters";
import HomeFilters from "@/components/home/HomeFilters";

const questions = [
  {
    _id: '1',
    title: 'Cascading Deletes in SQLAlchemy?',
    tags: [{ _id: '1', name: 'python' }, { _id: '2', name: 'sql' }],
    author: {
      _id: '1',
      name: 'John Doe',
      picture: 'john-doe.jpg',
    },
   // todo : test Milify npm  package to turn 1000 -> K
    upvotes: 1500000,
    views: 500552,
    answers: [],
    createdAt: new Date('2023-09-01T12:00:00.000Z'),
  },
  {
    _id: '2',
    title: 'How to center a div?',
    tags: [{ _id: '3', name: 'css' }, { _id: '4', name: 'html' }],
    author: {
      _id: '2',
      name: 'Jane Smith',
      picture: 'jane-smith.jpg',
    },
    upvotes: 5,
    views: 50,
    answers: [],
    createdAt: new Date('2022-09-02T10:30:00.000Z'),
  },
];

const Home = () => {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center " >
        <h1 className="h1-bold text-dark100_light900 " >All Questions</h1>
        <Link href={'/ask-question'} className="flex justify-end max-sm:w-full " >
          <Button
            className={`primary-gradient min-h-[46px] px-4 py-3 !text-light-900 `}
          >
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center " >
        <LocalSearchbar
          route="/"
          iconPosition='left'
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for other question.."
          otherClasses='flex-1'
        />
        {/* Filter for small screen  */}
        <Filter
          filters={HomePageFilters}
          otherClasses={`min-h-[56px] sm:min-w-[170px]`}
          containerClasses={`max-md:flex hidden`}
        />
      </div>
      <HomeFilters />
      <div className="mt-10 w-full flex flex-col gap-6 " >
        {questions.length > 0 && questions.map(question => (
          <QuestionCard
            key={question._id} _id={question._id}
            title={question.title} author={question.author}
            answers={question.answers} createdAt={question.createdAt}
            tags={question.tags} upvotes={question.upvotes} views={question.views}
          />
        ))}
        {questions.length === 0 && <NoResult
          title="There’s no question to show"
          description={`Be the first to break the silence! 🚀 Ask a Question and 
          kickstart the discussion. our query could be the next big thing others learn from. 
          Get involved! 💡`}
          link="/ask-question"
          linkTitle="Ask a Question"
        />}
      </div>
    </>
  )
}

export default Home