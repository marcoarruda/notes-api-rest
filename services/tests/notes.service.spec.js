
// https://dev.to/nedsoft/testing-nodejs-express-api-with-jest-and-supertest-1km6

import { jest, describe, expect, it } from '@jest/globals'

import { stubNotes } from './stubs.js'

import notesService from '../notes.service.js'

const model = {
  find: jest.fn(),
  insertOne: jest.fn(),
  deleteOne: jest.fn(),
}

describe('services > notes', () => {
  beforeAll(() => {
    notesService.setModel(model)
  })

  describe('list', () => {
    it('should return list of notes empty', async () => {
      model.find.mockResolvedValue([])

      const listResponse = await notesService.list()

      expect(listResponse).toHaveLength(0)
    })

    it('should return list of stub notes', async () => {
      model.find.mockResolvedValue(stubNotes())

      const listResponse = await notesService.list()

      expect(listResponse).toHaveLength(3)
    })
  })

  describe('add', () => {
    it.todo('should return created register')
    it.todo('should validate duplicated note')
    it.todo('should validate invalid fields')
  })

  describe('delete', () => {
    it.todo('should delete register properly')
    it.todo('should validate id when not found')
  })
})
