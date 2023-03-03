const mapNote = (note) => {
  const { _id: id, ...data } = note._doc

  return { id, ...data }
}

export default {

  model: null,

  setModel(model) {
    this.model = model
  },

  async list () {
    const notes = await this.model.find()

    return notes.map(mapNote)
  },

  async add (dto) {
    try {
      const note = new this.model({
        ...dto
      })

      return mapNote(await note.save())
    } catch (err) {
      throw new Error(err.message)
    }
  },

  async delete (id) {
    try {
      const exists = (await this.model.countDocuments({ _id: id })) > 0

      if (exists) await this.model.deleteOne({ _id: id })

      else throw new Error('Note not found')
    } catch (err) {
      throw new Error(err.message)
    }
  }
}