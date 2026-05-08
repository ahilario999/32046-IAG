import React, { useState, useRef, useEffect } from 'react'
import MessageBubble from './MessageBubble'
import InputField from './InputField'
import TypingIndicator from './TypingIndicator'

const WELCOME_MESSAGE = {
  role: 'agent',
  text: "Salut! Je suis l'Agent IA du programme Design Graphique de La Cité. Comment je peux t'aider?",
  timestamp: new Date(),
}

export default function ChatInterface() {
  const [messages, setMessages] = useState([WELCOME_MESSAGE])
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef(null)
  const conversationRef = useRef([])

  useEffect(() => {
    // block: 'nearest' = scrolle dans le conteneur le plus proche (chat-area),
    // pas dans la page — évite que la page entière remonte/descende sur mobile
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [messages, isTyping])

  const handleSend = async (text) => {
    const userMessage = { role: 'user', text, timestamp: new Date() }
    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)
    conversationRef.current.push({ role: 'user', text })

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: conversationRef.current }),
      })

      if (!response.ok) throw new Error(`API error: ${response.status}`)

      const data = await response.json()
      const replyText = data.reply
      conversationRef.current.push({ role: 'agent', text: replyText })

      setMessages((prev) => [...prev, {
        role: 'agent',
        text: replyText,
        timestamp: new Date(),
      }])
    } catch (error) {
      console.error('Chat error:', error)
      setMessages((prev) => [...prev, {
        role: 'agent',
        text: "Je n'ai pas la réponse pour toi, mais tu peux envoyer un message à M. Hilario : ahilar@lacitec.on.ca",
        timestamp: new Date(),
      }])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <>
      <div className="chat-area">
        {messages.map((msg, i) => (
          <MessageBubble key={i} role={msg.role} text={msg.text} timestamp={msg.timestamp} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={chatEndRef} />
      </div>
      <InputField onSend={handleSend} disabled={isTyping} />
    </>
  )
}
