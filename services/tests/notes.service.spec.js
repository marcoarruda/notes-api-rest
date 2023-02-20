
// https://dev.to/nedsoft/testing-nodejs-express-api-with-jest-and-supertest-1km6

import { describe, expect, it } from '@jest/globals'

import { stubNotes } from './stubs'

const collection = {
  find: jest.fn(),
  insertOne: jest.fn(),
  deleteOne: jest.fn(),
}

describe('services > notes', () => {
  let notesService

  beforeAll(() => {
    notesService = require('../notes.service.js')
    notesService.setCollection(collection)
  })

  describe('list', () => {
    it('should return list of notes empty', async () => {
      collection.find.mockReturnValue({
        toArray: jest.fn().mockResolvedValue([]),
      })

      const listResponse = await notesService.list()

      expect(listResponse).toHaveLength(0)
    })

    it('should return list of stub notes', async () => {
      collection.find.mockReturnValue({
        toArray: jest.fn().mockResolvedValue(stubNotes()),
      })

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
