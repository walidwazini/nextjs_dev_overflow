"use server"

import { revalidatePath } from "next/cache"

import Answer from "@/database/answer.model"
import { connectToDatabase } from "../mongoose"
import { AnswerVoteParams, CreateAnswerParams, DeleteAnswerParams, GetAnswersParams } from "./shared.types"
import Question from "@/database/question.model"
import Interaction from "@/database/interaction.model"

export const createAnswer = async (params: CreateAnswerParams) => {
  try {
    connectToDatabase()
    const { author, content, path, question } = params
    const newAnswer = await Answer.create({ content, author, question })

    // Add new answer into the array of answer in the question.
    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id }
    })

    // TODO : add interaction..

    revalidatePath(path)

  } catch (error) {

  }

}

export const getAnswers = async (params: GetAnswersParams) => {
  try {
    connectToDatabase()
    const { questionId } = params
    const answers = await Answer.find({ question: questionId })
      .populate('author', '_id clerkId name picture')
      .sort({ createdAt: -1 })

    return { answers }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const upvoteAnswer = async (params: AnswerVoteParams) => {
  try {
    connectToDatabase()
    const { answerId, userId, hasDownvoted, hasUpvoted, path } = params

    let updateQuery = {}

    if (hasUpvoted) {
      updateQuery = { $pull: { upvotes: userId } }
    } else if (hasDownvoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId }
      }
    } else {
      updateQuery = { $addToSet: { upvotes: userId } }
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, { new: true })

    if (!answer) {
      throw new Error('Answer not found.')
    }

    // TODO increase author reputation

    revalidatePath(path)

  } catch (error) {
    console.log(error)
    throw error
  }
}

export const downvoteAnswer = async (params: AnswerVoteParams) => {
  try {
    connectToDatabase()
    const { answerId, userId, hasDownvoted, hasUpvoted, path } = params

    let updateQuery = {}

    if (hasDownvoted) {
      updateQuery = { $pull: { downvotes: userId } }
    } else if (hasUpvoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId }
      }
    } else {
      updateQuery = { $addToSet: { upvotes: userId } }
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, { new: true })

    if (!answer) {
      throw new Error('Answer not found.')
    }

    // TODO increase author reputation

    revalidatePath(path)

  } catch (error) {
    console.log(error)
    throw error
  }
}

export const deleteAnswer = async ({ path, answerId }: DeleteAnswerParams) => {
  try {
    connectToDatabase()

    const answer = await Answer.findById(answerId)

    if (!answer) throw new Error('Answer not found.')

    await answer.deleteOne({ _id: answerId })

    await Question.updateMany({ _id: answer.question }, {
      $pull: { answers: answerId }
    })

    await Interaction.deleteMany({ answer: answerId })

  } catch (error) {
    console.log(error)
    throw error
  }
}