const connectionString = 'mongodb://localhost:27017'
const dbname = 'dev'

import mongoose from 'mongoose'
import schemas from './schemas/index.js'

export const connect = async () => {
  try {
    mongoose.set('strictQuery', true)

    await new Promise((res, rej) => mongoose.connect(`${connectionString}/${dbname}`, {
      serverSelectionTimeoutMS: 500,
    }, (err) => {
      if (err) rej(err)

      res()
    }))

    const models = new Map()
    models.set('Note', mongoose.model('Note', schemas.NoteSchema))
    models.set('User', mongoose.model('User', schemas.UserSchema))

    return models
  } catch (err) {
    console.log(err)
  }
}
