const { ObjectId } = require("mongodb");

const mapNote = (note) => {
  const { _id: id, ...data } = note

  return { id, ...data }
}

module.exports = {
  collection: null,

  async setCollection (collection) {
    this.collection = collection
  },

  async list () {
    const notes = await this.collection.find({}).toArray()

    return notes.map(mapNote)
  },

  async add (dto) {
    try {
      await this.collection.insertOne(dto)

      return mapNote(dto)
    } catch (err) {
      throw new Error(err.message)
    }
  },

  async delete (id) {
    try {
      const query = { _id: new ObjectId(id) };

      await this.collection.deleteOne(query);
    } catch (err) {
      throw new Error(err.message)
    }
  }
}