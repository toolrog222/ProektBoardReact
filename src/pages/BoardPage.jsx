import { useState } from 'react'
import { useBoard } from '../context/BoardContext'
import Column from '../components/Column'
import NotFoundPage from './NotFoundPage'
import EditableTitle from '../components/EditableTitle'

export default function BoardPage({ boardId, navigate }) {
  const { state, dispatch } = useBoard()
  const [newColTitle, setNewColTitle] = useState('')

  const board = state.boards.byId[boardId]
  if (!board) return <NotFoundPage navigate={navigate} />

  const columns = state.columns.allIds
    .map((cid) => state.columns.byId[cid])
    .filter((c) => c.boardId === boardId)

  const handleAddColumn = (e) => {
    e.preventDefault()
    if (!newColTitle.trim()) return
    dispatch({
      type: 'ADD_COLUMN',
      payload: { boardId, title: newColTitle },
    })
    setNewColTitle('')
  }

  const handleRenameBoard = (title) => {
    dispatch({ type: 'RENAME_BOARD', payload: { id: boardId, title } })
  }

  const goBack = (e) => {
    e.preventDefault()
    navigate('/boards')
  }

  return (
    <div className="page">
      <div className="row">
        <a href="/boards" onClick={goBack}>← Все доски</a>
      </div>

      <h1>
        <EditableTitle
          value={board.title}
          onSave={handleRenameBoard}
          className="board-title"
        />
      </h1>

      <form onSubmit={handleAddColumn} className="row">
        <input
          value={newColTitle}
          onChange={(e) => setNewColTitle(e.target.value)}
          placeholder="Название колонки"
        />
        <button type="submit">+ Колонка</button>
      </form>

      <div className="board">
        {columns.map((col) => (
          <Column key={col.id} column={col} />
        ))}
        {columns.length === 0 && <p>Добавьте первую колонку.</p>}
      </div>
    </div>
  )
}