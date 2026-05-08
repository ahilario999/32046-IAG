import React from 'react'

// Détecte les URLs dans le texte et les transforme en liens cliquables
function parseTextWithLinks(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g
  const parts = text.split(urlRegex)

  return parts.map((part, i) => {
    if (urlRegex.test(part)) {
      // Réinitialise le regex (stateful)
      urlRegex.lastIndex = 0
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="message__link"
        >
          {part}
        </a>
      )
    }
    return part
  })
}

// Formate le texte en paragraphes avec liens cliquables
function formatMessage(text) {
  // Sépare par double saut de ligne = paragraphes distincts
  const paragraphs = text.split(/\n{2,}/)

  return paragraphs.map((para, pIdx) => {
    // Dans chaque paragraphe, gère les sauts de ligne simples
    const lines = para.split('\n')

    const content = lines.map((line, lIdx) => (
      <React.Fragment key={lIdx}>
        {parseTextWithLinks(line)}
        {lIdx < lines.length - 1 && <br />}
      </React.Fragment>
    ))

    return (
      <p key={pIdx} className="message__para message-paragraph">
        {content}
      </p>
    )
  })
}

export default function MessageBubble({ role, text, timestamp }) {
  const isAgent = role === 'agent'

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('fr-CA', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className={`message message--${role}`}>
      <div className="message__bubble">
        {formatMessage(text)}
      </div>
      {timestamp && (
        <span className="message__time">
          {isAgent && '🤖 '}{formatTime(timestamp)}
        </span>
      )}
    </div>
  )
}
