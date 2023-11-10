"use server"

import { revalidatePath } from "next/cache"

import User from "@/database/user.model"
import { connectToDatabase } from "../mongoose"
import { CreateUserParams, DeleteUserParams, UpdateUserParams } from "./shared.types"
import Question from "@/database/question.model"


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

export const updateUser = async (params: UpdateUserParams) => {
  try {
    connectToDatabase();

    const { clerkId, updateData, path } = params;
    console.log(params)
    console.log('user action')

    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    console.log(updateData)

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const deleteUser = async (params: DeleteUserParams) => {
  try {
    connectToDatabase()

    const { clerkId } = params

    const user = await User.findOneAndDelete({ clerkId })

    if (!user) {
      throw new Error('User not found.')
    }

    // Delete questions, answers, comments etc of the user
    const userQuestionIds = await Question
      .find({ author: user._id })
      .distinct('_id')

    await Question.deleteMany({ author: user._id })

    // TODO: delete user's answers

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser

  } catch (error) {

  }
}