const stubNote = (...data) => ({
  note: 'some',
  ...data,
})

const stubNotes = (length = 3) => Array.from({ length }, () => stubNote())

export default {
  stubNote,
  stubNotes,
}