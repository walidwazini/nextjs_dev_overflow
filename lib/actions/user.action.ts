"use server"

import { revalidatePath } from "next/cache"
import { FilterQuery } from "mongoose"

import { connectToDatabase } from "../mongoose"
import {
  CreateUserParams, DeleteUserParams, GetAllUsersParams,
  UpdateUserParams, GetSavedQuestionParams, QuestionSaveParams, GetUserStatsParams,
} from "./shared.types"
import { Answer, Question, Tag, User } from "@/database"


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

    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

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

    const { searchQuery, filter } = params

    const query: FilterQuery<typeof User> = {}

    if (searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, 'i') } },
        { username: { $regex: new RegExp(searchQuery, 'i') } },
      ]
    }

    let sortOptions = {};
    switch (filter) {
      case "new_users":
        sortOptions = { joinedAt: -1 }
        break;
      case "old_users":
        sortOptions = { joinedAt: 1 }
        break;
      case "top_contributors":
        sortOptions = { reputation: -1 }
        break;

      default:
        break;
    }

    const users = await User.find(query).sort(sortOptions)

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

    let sortOptions = {};

    switch (filter) {
      case "most_recent":
        sortOptions = { createdAt: -1 }
        break;
      case "oldest":
        sortOptions = { createdAt: 1 }
        break;
      case "most_voted":
        sortOptions = { upvotes: -1 }
        break;
      case "most_viewed":
        sortOptions = { views: -1 }
        break;
      case "most_answered":
        sortOptions = { answers: -1 }
        break;

      default:
        break;
    }

    const user = await User.findOne({ clerkId })
      .populate({
        path: 'saved',
        match: query,
        options: {
          sort: sortOptions
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

export const getUserInfo = async ({ userId }: { userId: string }) => {
  try {
    connectToDatabase()

    const user = await User.findOne({ clerkId: userId })

    if (!user) {
      throw new Error('User not found.')
    }

    const totalQuestions = await Question.countDocuments({ author: user._id })
    const totalAnswers = await Answer.countDocuments({ author: user._id })

    return { user, totalQuestions, totalAnswers }

  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getUserQuestions = async (params: GetUserStatsParams) => {
  const { userId, page = 1, pageSize = 10 } = params

  try {
    connectToDatabase()

    const totalQuestions = await Question.countDocuments({ author: userId })

    const userQuestions = await Question.find({ author: userId })
      .sort({ views: -1 })
      .populate('tags', '_id name')
      .populate('author', '_id clerkId name picture')

    return { totalQuestions, questions: userQuestions }
  } catch (error) {
    throw error
  }
}

export const getUserAnswers = async (params: GetUserStatsParams) => {
  const { userId, page = 1, pageSize = 10 } = params

  try {
    connectToDatabase()

    const totalAnswers = await Answer.countDocuments({ author: userId })

    const userAnswers = await Answer.find({ author: userId })
      .sort({ upvotes: -1 })
      .populate('question', '_id title createdAt')
      .populate('author', '_id clerkId name picture')

    return { totalAnswers, answers: userAnswers }
  } catch (error) {
    throw error
  }
}