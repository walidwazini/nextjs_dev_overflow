"use server"

import { Interaction, Question } from "@/database"
import { connectToDatabase } from "../mongoose"
import { ViewQuestionParams } from "./shared.types"

export const viewQuestion = async (params: ViewQuestionParams) => {
  const { questionId, userId } = params

  try {
    connectToDatabase()

    // Update view count question
    await Question.findByIdAndUpdate(questionId, {
      $inc: { views: 1 }
    })

    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: 'view',
        question: questionId
      })

      if (existingInteraction) return ;

      if (!existingInteraction) {
        await Interaction.create({
          user: userId,
          action: 'view',
          question: questionId
        })
      }

    }

  } catch (error) {
    console.log(error)
    throw error
  }
}