import React from 'react'
import Link from 'next/link'

import { Filter, LocalSearchbar,NoResult } from '@/components/shared'
import { UserFilters } from '@/constants/filters'
import { getAllTags } from '@/lib/actions/tag.actions'

const Tags = async () => {
  const result = await getAllTags({})
  console.log(result?.tags.length)

  return (
    <>
    <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center " >
      <h1 className="h1-bold text-dark100_light900 " >All Tags</h1>
    </div>
    <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center " >
      <LocalSearchbar
        route="/community"
        iconPosition='left'
        imgSrc="/assets/icons/search.svg"
        placeholder="Search for amazing minds.."
        otherClasses='flex-1'
      />
      {/* Filter for small screen  */}
      <Filter
        filters={UserFilters}
        otherClasses={`min-h-[56px] sm:min-w-[170px]`}
      // containerClasses={`max-md:flex hidden`}
      />
    </div>
    <section
      className='mt-12 flex flex-wrap gap-4 '
    >
      {/* {result?.users?.length > 0 && result?.users?.map(user => (
        <UserCard key={user?._id} user={user} />
      ))} */}
      {/* {result?.users?.length === 0 && (
        <div className='paragraph-regular text-dark200_light800 mx-auto mt-20 max-w-4xl text-center' >
          <p className='text-lg mb-8' >No users yet</p>
          <Link href="/sign-up" className=" font-bold hover:underline text-accent-blue">
            Join to be the first!
          </Link>
        </div>
      )} */}
    </section>
  </>
  )
}

export default Tags