import React from 'react'

import { ProfileLinkProps } from '@/types'
import Link from 'next/link'

const ProfileLink = ({ imgUrl, title, href }: ProfileLinkProps) => {
  return (
    <div className='flex justify-center gap-1 ' >
      <img src={imgUrl} alt="icon" width={20} height={20} />
      {href ? (
        <Link href={href} target='_blank'
          className='text-accent-blue paragraph-medium '
        > {title}
        </Link>
      ) : (
        <p className='paragraph-medium text-dark400_light700 ' >{title}</p>
      )}
    </div>
  )
}

export default ProfileLink