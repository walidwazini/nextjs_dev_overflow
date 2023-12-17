import React from 'react'
import { auth, SignedIn } from '@clerk/nextjs'
import Link from 'next/link'
import moment from 'moment'

import { URLProps } from '@/types'
import { getUserInfo } from '@/lib/actions/user.action'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnswerTab, ProfileLink, QuestionTab, Stats } from '@/components/shared'


const ProfilePage = async ({ params, searchParams }: URLProps) => {

  const userInfo = await getUserInfo({ userId: params.id })
  const { userId: clerkId } = auth()

  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <img
            src={userInfo?.user.picture}
            alt="profile picture"
            width={140}
            height={140}
            className="rounded-full object-cover"
          />

          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900">{userInfo.user.name}</h2>
            <p className="paragraph-regular text-dark200_light800">@{userInfo.user.username}</p>

            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {userInfo.user.portfolioWebsite && (
                <ProfileLink
                  imgUrl="/assets/icons/link.svg"
                  href={userInfo.user.portfolioWebsite}
                  title={'Portfolio'}
                />
              )}
              {userInfo.user.location && (
                <ProfileLink
                  imgUrl="/assets/icons/location.svg"
                  title={userInfo.user.location}
                />
              )}
              <ProfileLink
                imgUrl='/assets/icons/calendar.svg'
                title={moment(userInfo?.user?.joinedAt).format('MMM YYYY')}
              />
            </div>
            {userInfo.user.bio && (
              <p className='paragraph-regular text-dark400_light800 mt-8 ' >
                {userInfo.user.bio}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {clerkId === userInfo.user.clerkId && (
              <Link href="/profile/edit">
                <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
                  Edit Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>
      <div>
        <Stats
          totalQuestions={userInfo.totalQuestions}
          totalAnswers={userInfo.totalAnswers}
        />
      </div>
      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList className="background-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger value="top-posts" className="tab">Top Posts</TabsTrigger>
            <TabsTrigger value="answers" className="tab">Answers</TabsTrigger>
          </TabsList>
          <TabsContent value="top-posts" className="mt-5 flex w-full flex-col gap-6">
            <QuestionTab searchParams={searchParams} userId={userInfo.user._id} clerkId={clerkId as string} />
          </TabsContent>
          <TabsContent value="answers" className="flex w-full flex-col gap-6">
            <AnswerTab searchParams={searchParams} userId={userInfo.user._id} clerkId={clerkId as string} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

export default ProfilePage