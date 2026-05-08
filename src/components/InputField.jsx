import React, { useState, useRef } from 'react'

export default function InputField({ onSend, disabled }) {
  const [text, setText] = useState('')
  const inputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setText('')
    inputRef.current?.focus()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form className="input-area" onSubmit={handleSubmit}>
      <textarea
        ref={inputRef}
        className="input-area__field"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ecris ta question..."
        rows={1}
        disabled={disabled}
        aria-label="Champ de message"
      />
      <button
        type="submit"
        className="input-area__button"
        disabled={!text.trim() || disabled}
        aria-label="Envoyer le message"
      >
        &#x2191;
      </button>
    </form>
  )
}
