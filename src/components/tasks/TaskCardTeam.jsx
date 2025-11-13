export default function TaskCardTeam({ task, onClick }){
  return (
    <button onClick={onClick} className="task-card text-left w-full">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-lg font-semibold">{task.name}</div>
          <div className="text-xs text-slate-500 mt-1">{task.user} • {task.llm} • {task.startTime?.slice(0,16).replace('T',' ')}</div>
        </div>
        <div className="text-slate-500">•••</div>
      </div>
      <div className="mt-4">
        <div className="progress-bar"><div className="progress-fill" style={{width:`${task.progress||0}%`}}/></div>
      </div>
      <style>{`
        .task-card{background:rgba(255,255,255,.8);backdrop-filter:blur(16px);border:2px solid transparent;border-radius:20px;padding:24px;box-shadow:0 8px 32px rgba(99,102,241,.12);transition:all .3s cubic-bezier(.4,0,.2,1);position:relative;overflow:hidden}
        .task-card::before{content:'';position:absolute;inset:0;background:linear-gradient(180deg, rgba(99,102,241,0.03) 0%, transparent 100%);opacity:.5;z-index:-1}
        .task-card:hover{transform:translateY(-4px) scale(1.02);box-shadow:0 12px 48px rgba(99,102,241,.18);border-color:transparent}
        .progress-bar{height:6px;background:rgba(99,102,241,0.1);border-radius:9999px;overflow:hidden}
        .progress-fill{height:100%;background:linear-gradient(90deg,#64748b,#475569);box-shadow:0 0 16px rgba(100,116,139,0.4);transition:width .5s ease}
      `}</style>
    </button>
  )
}
