const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


const notes = []

const NOTES_URL = '/api/v1/notes/'

app.get(NOTES_URL, (req, res) => {
  res.status(200).json(notes)
})

app.post(NOTES_URL, (req, res) => {
  const note = req.body

  notes.push(note)

  res.status(201).json(note)
})

const port = 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})