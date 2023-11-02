import mongoose from 'mongoose'

let isConnected: boolean = false

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true)

  if (!process.env.MONGODB_URL) return console.log(`Missing MongoDB url.`)

  if (isConnected) {
    return console.log('MongoDB succesfully connected.')
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, { dbName: 'dev-overflow' })

    isConnected = true

    console.log('MongoDB connected.')
  } catch (error) {
    console.log(error)
  }

}