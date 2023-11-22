import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { getTopInteractedTags } from '@/lib/actions/tag.actions'
import { Badge } from '../ui/badge'
import { RenderTag } from '../shared'


interface UserProps {
  user: {
    _id: string,
    clerkId: string,
    picture: string,
    name: string,
    username: string
  }
}

const UserCard = async ({ user }: UserProps) => {
  const interactedTags = await getTopInteractedTags({ userId: user._id }) || []


  return (
    <Link
      className='shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px] '
      href={`/profile/${user.clerkId}`}
    >
      <article className='background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8 ' >
        <img src={user.picture} height={100} width={100} className='rounded-full' />
        {/* <Image src={} /> */}
        <div className='mt-4 text-center ' >
          <h3 className='h3-bold text-dark200-light900 line-clamp-1 ' >{user.name}</h3>
          <p className='body-regular text-dark500-light500 mt-2 ' >@{user.username}</p>
        </div>
        <div className='mt-5' >
          {interactedTags?.length > 0 ? (
            <div className='flex items-center gap-2' >
              {interactedTags.map(tag => (
                <RenderTag key={tag._id} id={tag._id} name={tag.name} />
              ))}
            </div>
          ) : (
            <Badge>No tags yet</Badge>
          )}
        </div>
      </article>
    </Link>
  )
}

export default UserCard