import React from 'react'
import { auth } from '@clerk/nextjs'

import Question from '@/components/forms/Question'
import { redirect } from 'next/navigation'

const AskQuestion = () => {
  // * userId from Clerk will be used as clerkId in MongoDB
  const { userId } = auth()

  if (!userId) redirect('/sign-in')

  // TODO fetch request to get user details from MongoDB
  // const mongoUser = await getUserById()

  return (
    <div>
      <h1 className='h1-bold text-darkl100_light900' >Ask a Question</h1>
      <div className='mt-8' >
        <Question />
      </div>
    </div>
  )
}

export default AskQuestion