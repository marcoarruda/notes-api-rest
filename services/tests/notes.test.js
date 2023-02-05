const { describe, expect, it } = require('@jest/globals')

jest.setTimeout(100000)

const { stubNotes } = require('./stubs')

describe('services > notes', () => {
  let notesService

  beforeAll(() => {
    jest.useFakeTimers()

    notesService = require('../notes')
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  beforeEach(() => {
    notesService.notes = []
  })

  describe('list', () => {
    it('should return list of notes empty', async () => {
      const listResponsePromise = notesService.list()

      jest.runAllTimers()

      expect(listResponsePromise).resolves.toHaveLength(0)
    })

    it('should return list of stub notes', async () => {
      notesService.notes = stubNotes()

      const listResponsePromise = notesService.list()

      jest.runAllTimers()

      expect(listResponsePromise).resolves.toHaveLength(3)
    })
  })
})
