const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

const notesService = require('./services/notes')

app.use(cors())
app.use(bodyParser.json())

const NOTES_URL = '/api/v1/notes/'

app.get(NOTES_URL, async (req, res) => {
  const notes = await notesService.list()

  res.status(200).json(notes)
})

app.post(NOTES_URL, async (req, res) => {
  const note = await notesService.add(req.body)

  res.status(201).json(note)
})

app.delete(`${NOTES_URL}:id/`, async (req, res) => {
  const noteId = req.params.id

  try {
    await notesService.delete(noteId)

    res.status(204).send()
  } catch (err) {
    res.status(404).send()
  }
})

const port = 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})