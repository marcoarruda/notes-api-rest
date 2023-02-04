const nanoid = require('nanoid')

const notes = []

const sleep = (ms) => new Promise(res => setTimeout(res, ms))

module.exports = {
  list: async () => {
    await sleep(1000)

    return notes
  },

  add: async (dto) => {
    const note = {
      id: nanoid(),
      ...dto,
    }

    notes.push(note)

    await sleep(1000)

    return note
  },

  delete: async (id) => {
    const index = notes.findIndex((note => note.id === id))

    if (index === -1) throw new Error('Note not found')

    await sleep(1000)

    notes.splice(index, 1)
  }
}