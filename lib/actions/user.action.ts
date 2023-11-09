"use server"

import User from "@/database/user.model"
import { connectToDatabase } from "../mongoose"
import { CreateUserParams } from "./shared.types"


export const getUserById = async (params: any) => {
  try {
    connectToDatabase()

    const { userId } = params

    const user = await User.findOne({ clerkId: userId })

    return user

  } catch (error) {
    console.log(error)
    throw error
  }
}

export const createUser = async (userData: CreateUserParams) => {
  try {
    connectToDatabase()

    const newUser = await User.create(userData)
    console.log(userData)
    console.log(newUser)
    
    return newUser
  } catch (error) {
    console.log(error)
    throw error
  }
}