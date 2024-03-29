import type { Metadata } from 'next';
import Link from 'next/link'
import React from 'react'

import { Filter, LocalSearchbar } from '@/components/shared'
import { UserFilters } from '@/constants/filters'
import { getAllUsers } from '@/lib/actions/user.action'
import UserCard from '@/components/cards/UserCard'
import { SearchParamsProps } from '@/types';

export const metadata: Metadata = {
  title: 'Community | Dev Overflow',
}

const Community = async ({ searchParams }: SearchParamsProps) => {
  const result = await getAllUsers({
    searchQuery: searchParams.q,
    filter: searchParams.filter
  })

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center " >
        <h1 className="h1-bold text-dark100_light900 " >All Users</h1>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center " >
        <LocalSearchbar
          route="/community"
          iconPosition='left'
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for amazing minds.."
          otherClasses='flex-1'
        />
        <Filter
          filters={UserFilters}
          otherClasses={`min-h-[56px] sm:min-w-[170px]`}
        // containerClasses={`max-md:flex hidden`}
        />
      </div>
      <section
        className='mt-12 flex flex-wrap gap-4 '
      >
        {result?.users?.length > 0 && result?.users?.map(user => (
          <UserCard key={user?._id} user={user} />
        ))}
        {result?.users?.length === 0 && (
          <div className='paragraph-regular text-dark200_light800 mx-auto mt-20 max-w-4xl text-center' >
            <p className='text-lg mb-8' >No users yet</p>
            <Link href="/sign-up" className=" font-bold hover:underline text-accent-blue">
              Join to be the first!
            </Link>
          </div>
        )}
      </section>
    </>
  )
}

export default Community