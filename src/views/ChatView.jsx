import { useEffect, useRef, useState } from 'react'
import { Send } from 'lucide-react'

export default function ChatView({ onCreateTask }){
  const [messages, setMessages] = useState([
    { id: 'm1', role: 'assistant', content: 'What would you like to create?', quickActions: [
      { label: 'Sales Report', value: { intent: 'sales-report' }, selected: false },
      { label: 'Analysis', value: { intent: 'analysis' }, selected: false },
      { label: 'Research', value: { intent: 'research' }, selected: false },
      { label: 'Custom...', value: { intent: 'custom' }, selected: false },
    ]}
  ])
  const [input, setInput] = useState('')
  const [ready, setReady] = useState(false)
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const bottomRef = useRef(null)

  useEffect(()=> bottomRef.current?.scrollIntoView({behavior:'smooth'}), [messages])

  const send = async () => {
    if(!input.trim()) return
    const userMsg = { id: crypto.randomUUID(), role:'user', content: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    const res = await fetch(`${backend}/api/chat`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ history: [...messages, userMsg] }) })
    if(res.ok){
      const data = await res.json()
      setMessages(prev => [...prev, data.message])
      setReady(data.readyForTask)
    }
  }

  return (
    <div className="chat-view">
      {messages.map(m => (
        <div key={m.id} className={m.role==='assistant'? 'message-ai' : 'message-user'}>
          <div className="text-sm whitespace-pre-wrap">{m.content}</div>
          {m.quickActions && (
            <div className="mt-2 flex flex-wrap gap-2">
              {m.quickActions.map((q,i)=> (
                <button key={i} className="quick-action-button text-xs">{q.label}</button>
              ))}
            </div>
          )}
        </div>
      ))}

      <div ref={bottomRef} />

      <div className="flex items-center gap-3 mt-6">
        <input className="chat-input flex-1" placeholder="Type your message..." value={input} onChange={e=>setInput(e.target.value)} onKeyDown={(e)=> e.key==='Enter' && send()} />
        <button onClick={send} className="gradient-btn p-3 rounded-xl text-white"> <Send className="w-5 h-5"/> </button>
      </div>

      {ready && (
        <button className="create-task-button mt-6" onClick={()=> onCreateTask({ name: 'New Task', user: 'You' })}>Create Task</button>
      )}

      <style>{`
        .chat-view{max-width:800px;margin:0 auto;padding:32px}
        .message-ai{background:rgba(255,255,255,.8);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.2);border-radius:20px 20px 20px 8px;padding:16px;margin-bottom:16px;box-shadow:0 8px 32px rgba(99,102,241,.12)}
        .message-user{background:linear-gradient(135deg,#6366f1 0%, #8b5cf6 50%, #06b6d4 100%);color:#fff;border-radius:20px 20px 8px 20px;padding:16px;margin-bottom:16px;margin-left:auto;max-width:80%;box-shadow:0 4px 16px rgba(99,102,241,.3)}
        .quick-action-button{display:inline-flex;align-items:center;gap:8px;padding:8px 12px;border:1px solid rgba(255,255,255,.2);border-radius:9999px;background:rgba(255,255,255,.8);transition:all .2s ease}
        .quick-action-button:hover{background:linear-gradient(135deg,#6366f1 0%, #8b5cf6 50%, #06b6d4 100%);color:#fff;transform:translateY(-2px);box-shadow:0 4px 12px rgba(99,102,241,.3)}
        .chat-input{background:rgba(255,255,255,.8);backdrop-filter:blur(24px);border:2px solid rgba(255,255,255,.2);border-radius:24px;padding:16px;box-shadow:0 8px 32px rgba(99,102,241,.12);transition:all .2s ease;flex:1}
        .chat-input:focus{border-color:transparent;box-shadow:0 0 24px rgba(99,102,241,.2)}
        .gradient-btn{background:linear-gradient(135deg,#6366f1 0%, #8b5cf6 50%, #06b6d4 100%)}
        .create-task-button{width:100%;padding:16px;background:linear-gradient(135deg,#6366f1 0%, #8b5cf6 50%, #06b6d4 100%);color:white;border-radius:20px;font-weight:600;font-size:18px;box-shadow:0 8px 24px rgba(99,102,241,.3);animation:slide-up .3s ease}
        @keyframes slide-up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
    </div>
  )
}
