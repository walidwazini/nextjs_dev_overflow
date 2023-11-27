"use server"

import Answer from "@/database/answer.model"
import { connectToDatabase } from "../mongoose"
import { CreateAnswerParams } from "./shared.types"
import Question from "@/database/question.model"
import { revalidatePath } from "next/cache"

export const createAnswer = async (params: CreateAnswerParams) => {
  try {
    connectToDatabase()

    const { author, content, path, question } = params

    const newAnswer = new Answer({ content, author, question })
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