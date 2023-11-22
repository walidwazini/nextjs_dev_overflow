import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface UserProps {
  user: {
    _id: string,
    clerkId: string,
    picture: string,
    name: string,
    username: string
  }
}

const UserCard = ({ user }: UserProps) => {
  return (
    <Link 
    className='shadow-light100_darknone max-xs:min-w-full xs:w-[260px] '
    href={`/profile/${user.clerkId}`}
     >
      <article className='background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8 ' >
        <img src={user.picture} height={100} width={100} className='rounded-full' />
        {/* <Image src={} /> */}
      </article>
      <div className='mt-4 text-center ' >
        <h3 className='h3-bold text-dark200-light900 line-clamp-1 ' >{user.name}</h3>
        <p className='body-regular text-dark500-light500 mt-2 ' >@{user.username}</p>
        {/* TODO : create tags that user already been interact eg. React, Laravel, Dart  */}
      </div>
    </Link>
  )
}

export default UserCard