import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import { connect } from './database/mongoose.js'

const app = express()

import notesService from './services/notes.service.js'

app.use(cors())
app.use(bodyParser.json())

const NOTES_URL = '/api/v1/notes/'

app.get(NOTES_URL, async (req, res) => {
  const notes = await notesService.list()

  res.status(200).json(notes)
})

app.post(NOTES_URL, async (req, res) => {
  try {
    const note = await notesService.add(req.body)

    res.status(201).json(note)
  } catch (error) {
    res.status(404).json({ error })
  }
})

app.delete(`${NOTES_URL}:id/`, async (req, res) => {
  try {
    const noteId = req.params.id

    await notesService.delete(noteId)

    res.status(204).send()
  } catch (err) {
    res.status(404).send(err.message)
  }
})

const port = 3000
app.listen(port, async () => {
  try {
    const models = await connect()

    notesService.setModel(models.get('Note'))

    console.log(`Example app listening on port ${port}`)
  } catch (err) {
    console.log(err)
  }
})