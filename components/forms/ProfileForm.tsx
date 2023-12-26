"use client"

import { ProfileFormProps } from '@/types'
import React from 'react'


const ProfileForm = ({ clerkId, user }: ProfileFormProps) => {
  const parsedUser = JSON.parse(user)
  
  return (
    <div>ProfileForm</div>
  )
}

export default ProfileForm