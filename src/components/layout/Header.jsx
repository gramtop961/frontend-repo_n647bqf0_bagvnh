import { useEffect } from 'react'
import { Search, Sun, Moon, User } from 'lucide-react'

export default function Header({ activeTab, onTabChange }) {
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && ['1','2','3'].includes(e.key)) {
        const map = { '1': 'Chat', '2': 'Individual', '3': 'Team' }
        onTabChange(map[e.key])
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        const input = document.getElementById('global-search')
        input?.focus()
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'n') {
        onTabChange('Chat')
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onTabChange])

  return (
    <header className="sticky top-0 z-20 px-4 md:px-8 py-4">
      <div className="header glass-panel rounded-2xl border border-white/20 dark:border-white/10 shadow-xl">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-md" />
            <div>
              <div className="font-semibold">OPS Orchestrator</div>
              <div className="text-xs text-slate-500">Privacy-first ERP</div>
            </div>
          </div>

          <nav aria-label="Main navigation" className="tab-group flex items-center gap-1 p-1 rounded-full bg-indigo-500/10">
            {['Chat','Individual','Team'].map(tab => (
              <button
                key={tab}
                aria-label={`${tab} view`}
                aria-current={activeTab === tab ? 'page' : undefined}
                className={`px-4 py-2 rounded-full text-sm transition-all ${activeTab === tab ? 'tab-active text-white shadow' : 'text-slate-700 hover:text-slate-900'}`}
                onClick={() => onTabChange(tab)}
              >{tab}</button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input id="global-search" placeholder="Search" className="search-bar pl-9 pr-3 py-2 w-56 bg-white/70 dark:bg-slate-800/70 border rounded-xl text-sm outline-none" />
              <Search className="w-4 h-4 absolute left-2.5 top-2.5 text-slate-500" />
            </div>
            <button aria-label="Toggle theme" className="p-2 rounded-lg hover:bg-white/40 dark:hover:bg-white/10 transition">
              <Sun className="w-5 h-5" />
            </button>
            <button aria-label="Profile" className="p-2 rounded-full bg-white/60 dark:bg-slate-800/60 border border-white/20">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <style>{`
        .header{background:radial-gradient(at 80% 20%, rgba(99,102,241,.15) 0%, transparent 50%),radial-gradient(at 20% 80%, rgba(139,92,246,.15) 0%, transparent 50%),linear-gradient(180deg,#ffffff 0%, #fafbff 100%);backdrop-filter:blur(40px);box-shadow:0 4px 24px rgba(99,102,241,.08)}
        .tab-active{background:linear-gradient(135deg,#6366f1 0%, #8b5cf6 50%, #06b6d4 100%)}
        .search-bar{backdrop-filter:blur(24px);box-shadow:0 8px 32px rgba(99,102,241,.12)}
        .glass-panel{backdrop-filter:blur(40px)}
      `}</style>
    </header>
  )
}
