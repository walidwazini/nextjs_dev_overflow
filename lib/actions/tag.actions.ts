"use server"

import { FilterQuery } from 'mongoose'

import { connectToDatabase } from "../mongoose"
import {
  GetAllTagsParams, GetTopInteractedTags, GetQuestionsByTagIdParams
} from "./shared.types"
import Tag, { ITag } from "@/database/tag.model"
import { Question, User } from '@/database'

export const getAllTags = async (params: GetAllTagsParams) => {
  try {
    connectToDatabase()

    const tags = await Tag.find({}).sort({ createdAt: -1 })

    return { tags }

  } catch (error) {
    console.log(error)

  }
}

export const getTopInteractedTags = async (params: GetTopInteractedTags) => {
  try {
    connectToDatabase()

    const { userId, limit } = params

    const user = await User.findById(userId)

    if (!user) throw new Error("User not found!")

    // Find interactions for the user and group by tags...
    // TODO : Interactions...

    return [{ _id: '1', name: 'tag' }, { _id: '2', name: 'tag2' }]

  } catch (error) {
    console.log(error)
  }
}

export const getQuestionByTagId = async (params: GetQuestionsByTagIdParams) => {
  const { tagId, page = 1, pageSize = 10, searchQuery } = params
  try {
    connectToDatabase()

    const tagFilter: FilterQuery<ITag> = { _id: tagId }

    const selectedTag = await Tag.findOne(tagFilter).populate({
      path: 'questions',
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: 'i' } }
        : {},
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: 'tags', model: Tag, select: "_id name" },
        { path: 'author', model: User, select: '_id clerkId name picture' }
      ]
    })

    if (!selectedTag) {
      throw new Error('Tag not found.')
    }

    const questions = selectedTag.questions

    return { tagTitle: selectedTag.name, questions }

  } catch (error) {
    throw error
  }
}