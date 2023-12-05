"use server"

import { revalidatePath } from "next/cache"
import { FilterQuery } from "mongoose"

import User from "@/database/user.model"
import { connectToDatabase } from "../mongoose"
import {
  CreateUserParams, DeleteUserParams, GetAllUsersParams, GetSavedQuestionParams, QuestionSaveParams,
  UpdateUserParams,
} from "./shared.types"
import Question from "@/database/question.model"
import Tag from "@/database/tag.model"


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

export const getAllUsers = async (params: GetAllUsersParams) => {
  try {
    connectToDatabase()

    // const { page = 1, pageSize = 20, filter, searchQuery } = params

    const users = await User.find({}).sort({ createdAt: -1 })

    return { users }

  } catch (error) {
    console.log(error)
    throw error
  }
}


export const toggleSaveQuestion = async (params: QuestionSaveParams) => {
  try {
    connectToDatabase()
    const { userId, questionId, path } = params

    const user = await User.findById(userId)

    if (!user) {
      throw new Error('User not found.')
    }

    const isQuestionSaved = user.saved.includes(questionId)

    if (isQuestionSaved) {
      await User.findByIdAndUpdate(userId,
        { $pull: { saved: questionId } },
        { new: true }
      )
    } else {
      await User.findByIdAndUpdate(userId,
        { $addToSet: { saved: questionId } },
        { new: true }
      )
    }

    revalidatePath(path)

  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getSavedQuestions = async (params: GetSavedQuestionParams) => {
  try {
    connectToDatabase()
    const { clerkId, page = 1, pageSize = 10, filter, searchQuery } = params

    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, 'i') } }
      : {}

    const user = await User.findOne({ clerkId })
      .populate({
        path: '',
        match: query,
        options: {
          sort: { createdAt: -1 }
        },
        populate: [
          { path: 'tags', model: Tag, select: "_id name" },
          { path: 'author', model: User, select: '_id clerkId name picture' }
        ]
      })

    if (!user) {
      throw new Error('User not found.')
    }

    const savedQuestions = user.saved

    return { questions: savedQuestions }

  } catch (error) {
    console.log(error)
  }
}