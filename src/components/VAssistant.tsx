import { useState, useRef, useEffect, useCallback } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const WELCOME_MESSAGE = `Good evening. I am **V** — your research companion for The Record.

I can help you navigate 31 chapters of primary source documentation, clarify evidence classifications, find specific sources, and explore connections across the documentary record.

Ask me anything about the content on this site. I deal only in documented facts.

*Remember, remember the 5th of November.*`

function formatMessage(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>')
}

export default function VAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: WELCOME_MESSAGE },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasUnread, setHasUnread] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const sendMessage = async () => {
    const trimmed = input.trim()
    if (!trimmed || isLoading) return

    const userMessage: Message = { role: 'user', content: trimmed }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/v/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages
            .filter(m => m.content !== WELCOME_MESSAGE)
            .map(m => ({ role: m.role, content: m.content })),
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Connection failed' }))
        throw new Error(err.error || 'Request failed')
      }

      const data = await res.json()
      const assistantMessage: Message = { role: 'assistant', content: data.reply }
      setMessages(prev => [...prev, assistantMessage])
      if (!isOpen) setHasUnread(true)
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Something went wrong'
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `I apologize — I was unable to process that request. ${errorMsg}\n\n*Beneath this mask there is more than flesh. There is an idea — and ideas are bulletproof.*`,
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const clearChat = () => {
    setMessages([{ role: 'assistant', content: WELCOME_MESSAGE }])
  }

  return (
    <>
      {/* Floating V Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[100] w-14 h-14 rounded-full bg-ink text-parchment shadow-2xl hover:bg-crimson transition-all duration-300 flex items-center justify-center group no-print"
        aria-label={isOpen ? 'Close V assistant' : 'Open V assistant'}
        title="Ask V"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <>
            <svg className="w-8 h-8" viewBox="0 0 32 32" aria-hidden="true">
              <text x="16" y="24" textAnchor="middle" fontFamily="Georgia, serif" fontSize="22" fontWeight="bold" fill="currentColor">V</text>
            </svg>
            {hasUnread && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-crimson rounded-full border-2 border-parchment animate-pulse" />
            )}
          </>
        )}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-[100] w-[380px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-8rem)] bg-parchment border border-border rounded-sm shadow-2xl flex flex-col no-print"
          role="dialog"
          aria-label="V Research Assistant"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-ink text-parchment rounded-t-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-crimson flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 32 32">
                  <text x="16" y="24" textAnchor="middle" fontFamily="Georgia, serif" fontSize="20" fontWeight="bold" fill="#FAF8F5">V</text>
                </svg>
              </div>
              <div>
                <p className="font-display text-sm font-bold leading-none">V</p>
                <p className="font-sans text-[0.55rem] text-parchment/60 tracking-wide">Research Assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                className="p-1.5 text-parchment/40 hover:text-parchment transition-colors"
                aria-label="Clear conversation"
                title="New conversation"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                </svg>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-parchment/40 hover:text-parchment transition-colors"
                aria-label="Close V"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto px-4 py-3 space-y-4"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-sm px-3 py-2 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-crimson/10 text-ink border border-crimson/20'
                      : 'bg-parchment-dark text-ink border border-border'
                  }`}
                >
                  {msg.role === 'assistant' ? (
                    <div
                      className="font-body [&_strong]:font-semibold [&_em]:italic [&_em]:text-ink-muted"
                      dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                    />
                  ) : (
                    <p className="font-body">{msg.content}</p>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-parchment-dark border border-border rounded-sm px-3 py-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-crimson rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-crimson rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-crimson rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    <span className="font-sans text-[0.6rem] text-ink-faint ml-2">V is researching...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border px-3 py-3">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask V about The Record..."
                className="flex-1 bg-parchment-dark border border-border rounded-sm px-3 py-2 font-body text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 transition-colors"
                disabled={isLoading}
                aria-label="Message V"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="p-2 bg-ink text-parchment rounded-sm hover:bg-crimson disabled:opacity-30 disabled:hover:bg-ink transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
                aria-label="Send message"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V5m0 0l-7 7m7-7l7 7" />
                </svg>
              </button>
            </div>
            <p className="font-sans text-[0.5rem] text-ink-faint mt-1.5 text-center">
              V references only documented, sourced content from The Record.
            </p>
          </div>
        </div>
      )}
    </>
  )
}
