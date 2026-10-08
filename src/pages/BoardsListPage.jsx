import { useState } from 'react'
import { useBoard } from '../context/BoardContext'
import EditableTitle from '../components/EditableTitle'

export default function BoardsListPage({ navigate }) {
  const { state, dispatch } = useBoard()
  const [newTitle, setNewTitle] = useState('')

  const boards = state.boards.allIds.map((id) => state.boards.byId[id])

  const handleAdd = (e) => {
    e.preventDefault()
    if (!newTitle.trim()) return
    dispatch({ type: 'ADD_BOARD', payload: { title: newTitle } })
    setNewTitle('')
  }

  const handleRename = (id, title) => {
    dispatch({ type: 'RENAME_BOARD', payload: { id, title } })
  }

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_BOARD', payload: { id } })
  }

  return (
    <div className="page">
      <h1>Мои доски</h1>

      <form onSubmit={handleAdd} className="row">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Название новой доски"
        />
        <button type="submit">Создать</button>
      </form>

      <ul className="boards-list">
        {boards.map((b) => (
          <li key={b.id} className="board-item">
            <EditableTitle
              value={b.title}
              onSave={(t) => handleRename(b.id, t)}
              className="board-link"
            />
            <div className="board-actions">
              <button onClick={() => navigate(`/boards/${b.id}`)} title="Открыть">→</button>
              <button onClick={() => handleDelete(b.id)} title="Удалить">✕</button>
            </div>
          </li>
        ))}
        {boards.length === 0 && <p>Пока нет досок. Создайте первую.</p>}
      </ul>
    </div>
  )
}