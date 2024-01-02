"use server"

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "../mongoose"
import {
  CreateQuestionParams, DeleteQuestionParams, EditQuestionParams, GetQuestionByIdParams,
  GetQuestionsParams,
  QuestionVoteParams
} from "./shared.types";
import { Answer, Interaction, Question, Tag, User } from "@/database";


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
        { $setOnInsert: { name: tag }, $push: { questions: newQuestion._id } },
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
      .populate({ path: 'tags', model: Tag, select: '_id name' })
      .populate({ path: 'author', model: User, select: '_id clerkId name picture' })

    return question

  } catch (error) {
    console.log(error)
    throw error
  }
}

// ------  Voting for question  ---------

export const upvoteQuestion = async (params: QuestionVoteParams) => {
  try {
    const { userId, questionId, hasUpvoted, hasDownvoted, path } = params
    connectToDatabase()

    let updateQuery = {}

    if (hasUpvoted) {
      updateQuery = { $pull: { upvotes: userId } }
    } else if (hasDownvoted) {
      updateQuery = { $pull: { downvotes: userId }, $push: { upvotes: userId } }
    } else {
      updateQuery = { $addToSet: { upvotes: userId } }
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, { new: true })

    if (!question) {
      throw new Error('Question not found.')
    }

    // Increment author reputation.

    revalidatePath(path)

  } catch (error) {
    console.log(error)
    throw error
  }
}

export const downvoteQuestion = async (params: QuestionVoteParams) => {
  try {
    const { userId, questionId, hasUpvoted, hasDownvoted, path } = params
    connectToDatabase()

    let updateQuery = {}

    if (hasDownvoted) {
      updateQuery = { $pull: { downvotes: userId } }
    } else if (hasUpvoted) {
      updateQuery = { $pull: { upvotes: userId }, $push: { downvotes: userId } }
    } else {
      updateQuery = { $addToSet: { downvotes: userId } }
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, { new: true })

    if (!question) {
      throw new Error('Question not found.')
    }

    // Increment author reputation.

    revalidatePath(path)

  } catch (error) {
    console.log(error)
    throw error
  }
}

export const deleteQuestion = async ({ path, questionId }: DeleteQuestionParams) => {
  try {
    connectToDatabase()

    await Question.deleteOne({ _id: questionId })

    await Answer.deleteMany({ question: questionId })

    await Interaction.deleteMany({ question: questionId })

    await Tag.updateMany({ question: questionId }, {
      $pull: { questions: questionId }
    })

  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function editQuestion(params: EditQuestionParams) {
  try {
    connectToDatabase();

    const { questionId, title, content, path } = params;

    const question = await Question.findById(questionId).populate("tags");

    if (!question) {
      throw new Error("Question not found");
    }

    question.title = title;
    question.content = content;

    await question.save();

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export const getHotQuestions = async () => {
  try {
    connectToDatabase()

    const hotQuestions = await Question.find({})
      .sort({ views: -1, upvotes: -1 })
      .limit(5)

    return hotQuestions

  } catch (error) {
    console.log(error)
    throw error
  }
}