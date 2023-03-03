// @ts-check

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import { connect } from './database/mongoose.js'

const app = express()

// routes
import authRoutes from './routes/auth.routes.js'
import notesRoutes from './routes/notes.routes.js'

// services
import notesService from './services/notes.service.js'
import authService from './services/auth.service.js'

app.use(cors())
app.use(bodyParser.json())

app.use(authRoutes)
app.use(notesRoutes)

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
