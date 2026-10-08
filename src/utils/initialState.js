export const initialState = {
  boards: {
    byId: {
      'b1': { id: 'b1', title: 'Моя первая доска' },
    },
    allIds: ['b1'],
  },
  columns: {
    byId: {
      'c1': { id: 'c1', boardId: 'b1', title: 'To Do', cardIds: ['k1', 'k2'] },
      'c2': { id: 'c2', boardId: 'b1', title: 'In Progress', cardIds: [] },
      'c3': { id: 'c3', boardId: 'b1', title: 'Done', cardIds: [] },
    },
    allIds: ['c1', 'c2', 'c3'],
  },
  cards: {
    byId: {
      'k1': { id: 'k1', columnId: 'c1', title: 'Сделать задачу 1' },
      'k2': { id: 'k2', columnId: 'c1', title: 'Сделать задачу 2' },
    },
    allIds: ['k1', 'k2'],
  },
}

export const uid = () => Math.random().toString(36).slice(2, 10)