import React from 'react'
import { auth } from '@clerk/nextjs'

import Question from '@/components/forms/Question'
import { redirect } from 'next/navigation'
import { getUserById } from '@/lib/actions/user.action'

const AskQuestion = async () => {
  //  userId from Clerk will be used as clerkId in MongoDB
  const { userId } = auth()
  console.log(userId)

  if (!userId) redirect('/sign-in')

  const mongoUser = await getUserById({ userId })

  console.log(mongoUser)

  return (
    <div>
      <h1 className='h1-bold text-darkl100_light900' >Ask a Question</h1>
      <div className='mt-8' >
        <Question mongoUserId={JSON.stringify(mongoUser._id)} />
      </div>
    </div>
  )
}

export default AskQuestion