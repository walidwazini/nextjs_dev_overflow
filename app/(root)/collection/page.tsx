import ThemeButton from "@/components/DemoThemeButton";
import Link from "next/link";
import { auth } from '@clerk/nextjs'

import { Filter, LocalSearchbar, NoResult, QuestionCard } from "@/components/shared";
import { getSavedQuestions } from "@/lib/actions/user.action";
import { QuestionFilters } from "@/constants/filters";
import { Key } from "react";


// Only for mapping result
interface QuestionType {
  _id: string;
  title: string;
  author: { _id: string; name: string; picture: string; };
  answers: object[];
  createdAt: Date;
  tags: { _id: string; name: string; }[];
  upvotes: string | any[];
  views: number;
}

const CollectionPage = async () => {
  const { userId } = auth()

  if (!userId) return null;

  const result = await getSavedQuestions({
    clerkId: userId,
  })


  return (
    <>
      <h1 className="h1-bold text-dark100_light900 " >Saved Questions</h1>
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
          filters={QuestionFilters}
          otherClasses={`min-h-[56px] sm:min-w-[170px]`}
        />
      </div>
      <div className="mt-10 w-full flex flex-col gap-6 " >
        {result?.questions.length > 0 && result?.questions.map((question: QuestionType) => (
          <QuestionCard
            key={question._id} _id={question._id}
            title={question.title} author={question.author}
            answers={question.answers} createdAt={question.createdAt}
            tags={question.tags} upvotes={question.upvotes.length} views={question.views}
          />
        ))}
        {result?.questions.length === 0 && <NoResult
          title="There’s no saved question to show."
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

export default CollectionPage