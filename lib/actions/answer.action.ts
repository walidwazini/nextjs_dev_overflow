"use server"

import { revalidatePath } from "next/cache"

import Answer from "@/database/answer.model"
import { connectToDatabase } from "../mongoose"
import { CreateAnswerParams, GetAnswersParams } from "./shared.types"
import Question from "@/database/question.model"

export const createAnswer = async (params: CreateAnswerParams) => {
  try {
    connectToDatabase()

    const { author, content, path, question } = params

    const newAnswer = await Answer.create({ content, author, question })
    console.log(newAnswer)

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