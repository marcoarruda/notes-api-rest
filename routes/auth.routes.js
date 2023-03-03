// @ts-check

// libs
import express from 'express'

// services
import authService from '../services/auth.service.js'

// const
const API_URL = '/api/v1'
const router = express.Router()

router.get(`${API_URL}/users`, async(req, res) => {
  const users = await authService.getUsers()

  res.status(200).json(users)
})

router.post(`${API_URL}/auth/register/`, async (req, res) => {
  try {
    await authService.register(req.body)

    res.status(201).json()
  } catch (err) {
    res.status(401).json({ error: err.message })
  }
})

router.post(`${API_URL}/auth/login/`, async (req, res) => {

})

export default router
