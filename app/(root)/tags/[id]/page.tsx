import React from 'react'

import { getQuestionByTagId } from '@/lib/actions/tag.actions'
import { LocalSearchbar, NoResult, QuestionCard } from '@/components/shared'
import { URLProps } from '@/types'

const TagDetailsPage = async ({ params, searchParams }: URLProps) => {

  const result = await getQuestionByTagId({
    tagId: params.id, page: 1, searchQuery: searchParams.q
  })

  return (
    <>
      <h1 className="h1-bold text-dark100_light900 " >{result.tagTitle}</h1>
      <div className="mt-11 w-full " >
        <LocalSearchbar
          route={`/tags/${params.id}`}
          iconPosition='left'
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for other question.."
          otherClasses='flex-1'
        />

      </div>
      <div className="mt-10 w-full flex flex-col gap-6 " >
        {result?.questions.length > 0 && result?.questions.map((question: any) => (
          <QuestionCard
            key={question._id} _id={question._id}
            title={question.title} 
            author={question.author}
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

export default TagDetailsPage