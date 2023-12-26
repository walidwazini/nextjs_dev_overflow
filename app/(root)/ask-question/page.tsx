import React from 'react'
import { auth } from '@clerk/nextjs'

import { redirect } from 'next/navigation'
import { getUserById } from '@/lib/actions/user.action'
import QuestionForm from '@/components/forms/QuestionForm'

const AskQuestion = async () => {
  // adasd asdas
  //  userId from Clerk will be used as clerkId in MongoDB
  const { userId } = auth()

  if (!userId) redirect('/sign-in')

  const mongoUser = await getUserById({ userId })
  
  return (
    <div>
      <h1 className='h1-bold text-darkl100_light900' >Ask a Question</h1>
      <div className='mt-8' >
        <QuestionForm type='create' mongoUserId={JSON.stringify(mongoUser?._id)} />
      </div>
    </div>
  )
}

export default AskQuestion