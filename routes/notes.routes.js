// @ts-check

// libs
import express from 'express'

// services
import notesService from '../services/notes.service.js'

// const
const API_URL = '/api/v1'
const router = express.Router()

router.get(`${API_URL}/notes/`, async (req, res) => {
  const notes = await notesService.list()

  res.status(200).json(notes)
})

router.post(`${API_URL}/notes/`, async (req, res) => {
  try {
    const note = await notesService.add(req.body)

    res.status(201).json(note)
  } catch (error) {
    res.status(404).json({ error })
  }
})

router.delete(`${`${API_URL}/notes/`}:id/`, async (req, res) => {
  try {
    const noteId = req.params.id

    await notesService.delete(noteId)

    res.status(204).send()
  } catch (err) {
    res.status(404).send(err.message)
  }
})

export default router
