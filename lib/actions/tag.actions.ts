"use server"

import User from "@/database/user.model"
import { connectToDatabase } from "../mongoose"
import { GetAllTagsParams, GetTopInteractedTags } from "./shared.types"
import Tag from "@/database/tag.model"

export const getAllTags = async (params: GetAllTagsParams) => {
  try {
    connectToDatabase()

    const tags = await Tag.find({})

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