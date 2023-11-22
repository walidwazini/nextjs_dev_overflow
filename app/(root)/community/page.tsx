import Link from 'next/link'
import React from 'react'

import { Filter, LocalSearchbar } from '@/components/shared'
import { UserFilters } from '@/constants/filters'
import { getAllUsers } from '@/lib/actions/user.action'

const Community = async () => {
  const result = await getAllUsers({})

  console.log(result)

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
        <ul>
          {result?.users.length > 0 && result?.users?.map(item => (
            <li key={item._id} >{item.username}</li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default Community