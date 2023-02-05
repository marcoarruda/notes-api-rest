const stubNote = (...data) => ({
  note: 'some',
  ...data,
})

const stubNotes = (length = 3) => Array.from({ length }, () => stubNote())

module.exports = {
  stubNote,
  stubNotes,
}