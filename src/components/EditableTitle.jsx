import { useEffect, useRef, useState } from 'react'

export default function EditableTitle({ value, onSave, className }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const inputRef = useRef(null)

  useEffect(() => {
    setDraft(value)
  }, [value])

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editing])

  const startEdit = () => {
    setDraft(value)
    setEditing(true)
  }

  const commit = () => {
    setEditing(false)
    const trimmed = draft.trim()
    if (trimmed && trimmed !== value) {
      onSave(trimmed)
    }
  }

  const cancel = () => {
    setEditing(false)
    setDraft(value)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      commit()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      cancel()
    }
  }

  if (editing) {
    return (
      <input
        ref={inputRef}
        className={className}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={onKeyDown}
      />
    )
  }

  return (
    <span
      className={className}
      onClick={startEdit}
      title="Клик — редактировать"
      style={{ cursor: 'text' }}
    >
      {value}
    </span>
  )
}