export const stubNote = (...data) => ({
  _doc: {
    note: 'some',
    ...data,
  }
})

export const stubNotes = (length = 3) => Array.from({ length }, () => stubNote())
