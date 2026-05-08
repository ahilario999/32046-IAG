import React from 'react'

export default function TypingIndicator() {
  return (
    <div className="typing-indicator" aria-label="L'agent est en train d'écrire...">
      <div className="typing-indicator__dot" />
      <div className="typing-indicator__dot" />
      <div className="typing-indicator__dot" />
    </div>
  )
}
