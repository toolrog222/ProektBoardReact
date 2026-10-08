import { uid } from '../utils/initialState'

export const boardReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_BOARD': {
      const id = uid()
      const title = action.payload?.title?.trim() || 'Новая доска'
      return {
        ...state,
        boards: {
          byId: { ...state.boards.byId, [id]: { id, title } },
          allIds: [...state.boards.allIds, id],
        },
      }
    }

    case 'RENAME_BOARD': {
      const { id, title } = action.payload
      const board = state.boards.byId[id]
      if (!board) return state
      return {
        ...state,
        boards: {
          ...state.boards,
          byId: {
            ...state.boards.byId,
            [id]: { ...board, title: title.trim() || board.title },
          },
        },
      }
    }

    case 'DELETE_BOARD': {
      const { id } = action.payload
      if (!state.boards.byId[id]) return state

      const columnIds = state.columns.allIds.filter(
        (cid) => state.columns.byId[cid].boardId === id
      )

      const cardIds = columnIds.flatMap(
        (cid) => state.columns.byId[cid].cardIds
      )

      const newColumnsById = { ...state.columns.byId }
      columnIds.forEach((cid) => delete newColumnsById[cid])

      const newCardsById = { ...state.cards.byId }
      cardIds.forEach((kid) => delete newCardsById[kid])

      const newBoardsById = { ...state.boards.byId }
      delete newBoardsById[id]

      return {
        boards: {
          byId: newBoardsById,
          allIds: state.boards.allIds.filter((bid) => bid !== id),
        },
        columns: {
          byId: newColumnsById,
          allIds: state.columns.allIds.filter((cid) => !columnIds.includes(cid)),
        },
        cards: {
          byId: newCardsById,
          allIds: state.cards.allIds.filter((kid) => !cardIds.includes(kid)),
        },
      }
    }

    case 'ADD_COLUMN': {
      const { boardId, title } = action.payload
      if (!state.boards.byId[boardId]) return state

      const id = uid()
      const column = {
        id,
        boardId,
        title: title?.trim() || 'Новая колонка',
        cardIds: [],
      }
      return {
        ...state,
        columns: {
          byId: { ...state.columns.byId, [id]: column },
          allIds: [...state.columns.allIds, id],
        },
      }
    }

    case 'RENAME_COLUMN': {
      const { id, title } = action.payload
      const col = state.columns.byId[id]
      if (!col) return state
      return {
        ...state,
        columns: {
          ...state.columns,
          byId: {
            ...state.columns.byId,
            [id]: { ...col, title: title.trim() || col.title },
          },
        },
      }
    }

    case 'DELETE_COLUMN': {
      const { id } = action.payload
      const col = state.columns.byId[id]
      if (!col) return state

      const cardIds = col.cardIds

      const newCardsById = { ...state.cards.byId }
      cardIds.forEach((kid) => delete newCardsById[kid])

      const newColumnsById = { ...state.columns.byId }
      delete newColumnsById[id]

      return {
        ...state,
        columns: {
          byId: newColumnsById,
          allIds: state.columns.allIds.filter((cid) => cid !== id),
        },
        cards: {
          byId: newCardsById,
          allIds: state.cards.allIds.filter((kid) => !cardIds.includes(kid)),
        },
      }
    }

    case 'ADD_CARD': {
      const { columnId, title } = action.payload
      const col = state.columns.byId[columnId]
      if (!col) return state

      const id = uid()
      const card = { id, columnId, title: title?.trim() || 'Новая карточка' }

      return {
        ...state,
        cards: {
          byId: { ...state.cards.byId, [id]: card },
          allIds: [...state.cards.allIds, id],
        },
        columns: {
          ...state.columns,
          byId: {
            ...state.columns.byId,
            [columnId]: { ...col, cardIds: [...col.cardIds, id] },
          },
        },
      }
    }

    case 'RENAME_CARD': {
      const { id, title } = action.payload
      const card = state.cards.byId[id]
      if (!card) return state
      return {
        ...state,
        cards: {
          ...state.cards,
          byId: {
            ...state.cards.byId,
            [id]: { ...card, title: title.trim() || card.title },
          },
        },
      }
    }

    case 'DELETE_CARD': {
      const { id } = action.payload
      const card = state.cards.byId[id]
      if (!card) return state

      const col = state.columns.byId[card.columnId]

      const newCardsById = { ...state.cards.byId }
      delete newCardsById[id]

      return {
        ...state,
        cards: {
          byId: newCardsById,
          allIds: state.cards.allIds.filter((kid) => kid !== id),
        },
        columns: {
          ...state.columns,
          byId: {
            ...state.columns.byId,
            [card.columnId]: {
              ...col,
              cardIds: col.cardIds.filter((kid) => kid !== id),
            },
          },
        },
      }
    }

    default:
      return state
  }
}