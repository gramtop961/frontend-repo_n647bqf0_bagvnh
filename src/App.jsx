import { useEffect, useMemo, useState } from 'react'
import Background from './components/layout/Background'
import Header from './components/layout/Header'
import StatsBar from './components/layout/StatsBar'
import DetailPanel from './components/layout/DetailPanel'
import ChatView from './views/ChatView'
import IndividualView from './views/IndividualView'
import TeamView from './views/TeamView'

function App() {
  const [activeTab, setActiveTab] = useState('Chat') // Chat | Individual | Team
  const [selectedTask, setSelectedTask] = useState(null)
  const [tasks, setTasks] = useState([])
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  // Load tasks
  const loadTasks = async () => {
    try {
      const res = await fetch(`${backend}/api/tasks`)
      if (res.ok) {
        const data = await res.json()
        setTasks(data)
      }
    } catch (e) {
      // ignore for first load
    }
  }

  useEffect(() => {
    loadTasks()
    const id = setInterval(loadTasks, 4000)
    return () => clearInterval(id)
  }, [])

  const onCreateTask = async (payload) => {
    const res = await fetch(`${backend}/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      const t = await res.json()
      setTasks((prev) => [t, ...prev])
      setActiveTab('Individual')
    }
  }

  const content = useMemo(() => {
    if (activeTab === 'Chat') return (
      <ChatView onCreateTask={onCreateTask} />
    )
    if (activeTab === 'Individual') return (
      <IndividualView tasks={tasks} onSelect={setSelectedTask} />
    )
    return <TeamView tasks={tasks} onSelect={setSelectedTask} />
  }, [activeTab, tasks])

  return (
    <div className="relative min-h-screen text-slate-900 dark:text-slate-100">
      <Background />
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="page-transition max-w-7xl mx-auto px-4 md:px-8">
        <div className="mt-6">
          <StatsBar />
        </div>
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6 items-start">
          <section aria-label="Primary content" className="min-h-[60vh]">
            {content}
          </section>
          <aside aria-label="Task details" className="hidden lg:block">
            <DetailPanel task={selectedTask} />
          </aside>
        </div>
      </main>
    </div>
  )
}

export default App
