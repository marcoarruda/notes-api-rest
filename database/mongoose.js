const connectionString = 'mongodb://localhost:27017'
const dbname = 'dev'

import mongoose from 'mongoose'
import schemas from './schemas/index.js'

export const connect = async () => {
  try {
    mongoose.set('strictQuery', true)
    await mongoose.connect(`${connectionString}/${dbname}`, { useNewUrlParser: true })

    const models = new Map()
    models.set('Note', mongoose.model('Note', schemas.NoteSchema))

    return models
  } catch (err) {
    console.log(err)
  }
}
