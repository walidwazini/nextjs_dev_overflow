"use server"

import { Schema } from "mongoose";
import { revalidatePath } from "next/cache";

import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import { connectToDatabase } from "../mongoose"
import User, { IUser } from "@/database/user.model";

import { CreateQuestionParams, GetQuestionByIdParams, GetQuestionsParams } from "./shared.types";

export const getQuestions = async (params: GetQuestionsParams) => {
  try {
    connectToDatabase();

    const questions = await Question.find({})
      .populate({ path: 'tags', model: Tag })
      .populate({ path: 'author', model: User })
      .sort({ createdAt: -1 })

    return { questions };
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  try {
    connectToDatabase();

    const { title, content, tags, author, path } = params;

    const newQuestion = await Question.create({
      title,
      content,
      author
    });

    const tagDocuments = [];

    // Create the tags or get them if they already exist
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { question: newQuestion._id } },
        //  upsert : insert + update tag
        { upsert: true, new: true }
      )
      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(newQuestion._id, {
      $push: { tags: { $each: tagDocuments } }
    });

    // TODO Create an interaction record for the user's ask_question action

    // TODO Increment author's reputation by +5 for creating a question

    revalidatePath(path)

  } catch (error) {
    console.log(error)
  }
}

export const getQuestionById = async (params: GetQuestionByIdParams) => {
  try {
    connectToDatabase()

    const { questionId } = params

    const question = await Question.findById(questionId)

    return question

  } catch (error) {
    console.log(error)
    throw error
  }
}