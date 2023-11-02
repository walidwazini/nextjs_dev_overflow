"use server"

import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import { connectToDatabase } from "../mongoose"
import User from "@/database/user.model";

export interface CreateQuestionParams {
  title: string;
  content: string;
  tags: string[];
  author: string
  path: string;
}

export async function createQuestion(params: any) {
  try {
    connectToDatabase();

    const { title, content, tags, author, path } = params;

    // Create the question
    const newQuestion = await Question.create({
      title,
      content,
      // author
    });

    const tagDocuments = [];

    // Create the tags or get them if they already exist
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { question: newQuestion._id } },
        // * upsert : insert + update tag
        { upsert: true, new: true }
      )
      
      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(newQuestion._id, {
      $push: { tags: { $each: tagDocuments } }
    });

    // TODO Create an interaction record for the user's ask_question action

    // TODO Increment author's reputation by +5 for creating a question

  } catch (error) {
    console.log(error)
  }
}