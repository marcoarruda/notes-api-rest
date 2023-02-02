const nanoid = require('nanoid')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


const notes = []

const NOTES_URL = '/api/v1/notes/'

const sleep = (ms) => new Promise(res => setTimeout(res, ms))

app.get(NOTES_URL, async (req, res) => {
  await sleep(1000)

  res.status(200).json(notes)
})

app.post(NOTES_URL, async (req, res) => {
  const note = {
    id: nanoid(),
    ...req.body,
  }

  notes.push(note)

  await sleep(1000)

  res.status(201).json(note)
})

app.delete(`${NOTES_URL}:id/`, async (req, res) => {
  const noteId = req.params.id

  const index = notes.findIndex((note => note.id === noteId))

  if (index === -1) return res.status(404).send()

  await sleep(1000)

  notes.splice(index, 1)

  res.status(204).send()
})

const port = 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})