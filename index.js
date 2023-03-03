// @ts-check

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import { connect } from './database/mongoose.js'

const app = express()

import notesService from './services/notes.service.js'
import authService from './services/auth.service.js'

app.use(cors())
app.use(bodyParser.json())

const API_URL = '/api/v1'

app.get(`${API_URL}/notes/`, async (req, res) => {
  const notes = await notesService.list()

  res.status(200).json(notes)
})

app.post(`${API_URL}/notes/`, async (req, res) => {
  try {
    const note = await notesService.add(req.body)

    res.status(201).json(note)
  } catch (error) {
    res.status(404).json({ error })
  }
})

app.delete(`${`${API_URL}/notes/`}:id/`, async (req, res) => {
  try {
    const noteId = req.params.id

    await notesService.delete(noteId)

    res.status(204).send()
  } catch (err) {
    res.status(404).send(err.message)
  }
})

app.get(`${API_URL}/users/`, async (req, res) => {
  const users = await authService.getUsers()

  res.status(200).json(users)
})

app.post(`${API_URL}/auth/register/`, async (req, res) => {
  try {
    await authService.register(req.body)

    res.status(201).json()
  } catch (err) {
    res.status(401).json({ error: err.message })
  }
})

app.post(`${API_URL}/auth/login/`, async (req, res) => {

})

const port = 3000
app.listen(port, async () => {
  try {
    const models = await connect()

    if (!models) throw new Error('Could not connect to Mongodb')

    notesService.setModel(models.get('Note'))
    authService.setModel(models.get('User'))

    console.log(`Example app listening on port ${port}`)
  } catch (err) {
    console.log(err)
  }
})