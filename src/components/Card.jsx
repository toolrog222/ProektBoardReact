import { useBoard } from '../context/BoardContext'
import EditableTitle from './EditableTitle'

export default function Card({ card }) {
  const { dispatch } = useBoard()

  const handleRename = (title) => {
    dispatch({
      type: 'RENAME_CARD',
      payload: { id: card.id, title },
    })
  }

  const handleDelete = () => {
    dispatch({ type: 'DELETE_CARD', payload: { id: card.id } })
  }

  return (
    <div className="card">
      <EditableTitle
        value={card.title}
        onSave={handleRename}
        className="card-title"
      />
      <button onClick={handleDelete} title="Удалить">✕</button>
    </div>
  )
}