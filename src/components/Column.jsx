import { useState } from 'react'
import { useBoard } from '../context/BoardContext'
import Card from './Card'
import EditableTitle from './EditableTitle'

export default function Column({ column }) {
  const { state, dispatch } = useBoard()
  const [newCardTitle, setNewCardTitle] = useState('')

  const cards = column.cardIds.map((kid) => state.cards.byId[kid])

  const handleRename = (title) => {
    dispatch({
      type: 'RENAME_COLUMN',
      payload: { id: column.id, title },
    })
  }

  const handleDelete = () => {
    dispatch({ type: 'DELETE_COLUMN', payload: { id: column.id } })
  }

  const handleAddCard = (e) => {
    e.preventDefault()
    if (!newCardTitle.trim()) return
    dispatch({
      type: 'ADD_CARD',
      payload: { columnId: column.id, title: newCardTitle },
    })
    setNewCardTitle('')
  }

  return (
    <div className="column">
      <div className="column-header">
        <h3>
          <EditableTitle
            value={column.title}
            onSave={handleRename}
            className="column-title"
          />
        </h3>
        <button onClick={handleDelete} title="Удалить колонку">✕</button>
      </div>

      <div className="cards">
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>

      <form onSubmit={handleAddCard} className="row">
        <input
          value={newCardTitle}
          onChange={(e) => setNewCardTitle(e.target.value)}
          placeholder="Новая карточка"
        />
        <button type="submit">+</button>
      </form>
    </div>
  )
} 