
import React from 'react'

import { URLProps } from '@/types'
import { getUserInfo } from '@/lib/actions/user.action'

const ProfilePage = async ({ params, searchParams }: URLProps) => {
  
  const userInfo = await getUserInfo({userId: params.id})

  console.log(userInfo)

  return (
    <div>
      <h1>{params.id}</h1>
    </div>
  )
}

export default ProfilePage