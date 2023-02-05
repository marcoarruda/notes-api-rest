const nanoid = require('nanoid')

const sleep = (ms) => new Promise(res => setTimeout(res, ms))

module.exports = {
  notes: [],

  async list () {
    await sleep(1000)

    return this.notes
  },

  async add (dto) {
    const note = {
      id: nanoid(),
      ...dto,
    }

    this.notes.push(note)

    await sleep(1000)

    return note
  },

  async delete (id) {
    const index = this.notes.findIndex((note => note.id === id))

    if (index === -1) throw new Error('Note not found')

    await sleep(1000)

    this.notes.splice(index, 1)
  }
}