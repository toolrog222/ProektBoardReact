import { createContext, useContext, useReducer } from 'react'
import { boardReducer } from './boardReducer'
import { initialState } from '../utils/initialState'
import { useLocalStorage } from '../hooks/useLocalStorage'

const BoardContext = createContext(null)

export function BoardProvider({ children }) {
  const [storedState, setStoredState] = useLocalStorage(
    'kanban-state',
    initialState
  )

  const wrappedReducer = (state, action) => {
    const next = boardReducer(state, action)
    setStoredState(next)
    return next
  }

  const [state, dispatch] = useReducer(wrappedReducer, storedState)

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  )
}

export function useBoard() {
  const ctx = useContext(BoardContext)
  if (!ctx) throw new Error('useBoard must be used within BoardProvider')
  return ctx
}