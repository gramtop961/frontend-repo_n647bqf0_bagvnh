export default function TaskCardIndividual({ task, onClick }){
  const statusClass = task.status === 'running' ? 'task-card-running' : ''
  return (
    <button onClick={onClick} className={`task-card text-left w-full ${statusClass}`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-lg font-semibold">{task.name}</div>
          <div className="text-xs text-slate-500 mt-1">{task.llm} • {task.status} • {task.startTime?.slice(0,16).replace('T',' ')}</div>
        </div>
        <div className="text-slate-500">•••</div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="text-xs font-medium text-slate-600">Pipeline</div>
        {task.steps?.map((s, idx)=> (
          <div key={idx} className="pipeline-step">
            <div className={`step-icon ${s.status==='complete'?'step-complete': s.status==='running'?'step-running':''}`}></div>
            <div className="flex-1">
              <div className="flex items-center justify-between text-sm">
                <span>{s.name}</span>
                {typeof s.progress==='number' && <span>{s.progress}%</span>}
              </div>
              {typeof s.progress==='number' && (
                <div className="progress-bar"><div className="progress-fill" style={{width:`${s.progress}%`}}/></div>
              )}
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .task-card{background:rgba(255,255,255,.8);backdrop-filter:blur(16px);border:2px solid transparent;border-radius:20px;padding:24px;box-shadow:0 8px 32px rgba(99,102,241,.12);transition:all .3s cubic-bezier(.4,0,.2,1);position:relative;overflow:hidden}
        .task-card::before{content:'';position:absolute;inset:0;background:linear-gradient(180deg, rgba(99,102,241,0.03) 0%, transparent 100%);opacity:.5;z-index:-1}
        .task-card:hover{transform:translateY(-4px) scale(1.02);box-shadow:0 12px 48px rgba(99,102,241,.18);border-color:transparent}
        .task-card-running{border-color:#f59e0b;background:linear-gradient(135deg, rgba(245,158,11,.05), transparent)}
        .progress-bar{height:6px;background:rgba(99,102,241,0.1);border-radius:9999px;overflow:hidden}
        .progress-fill{height:100%;background:linear-gradient(90deg,#f59e0b,#f97316);box-shadow:0 0 16px rgba(245,158,11,0.4);animation:shimmer 2s infinite;transition:width .5s ease}
        @keyframes shimmer{0%{opacity:.8}50%{opacity:1}100%{opacity:.8}}
        .pipeline-step{display:flex;align-items:center;gap:12px;padding:4px 0;font-size:14px}
        .step-icon{width:20px;height:20px;border-radius:9999px;background:rgba(148,163,184,.4)}
        .step-complete{background:linear-gradient(90deg,#10b981,#06b6d4);box-shadow:0 0 12px rgba(16,185,129,.4)}
        .step-running{background:linear-gradient(90deg,#f59e0b,#f97316);animation:pulse 2s infinite}
      `}</style>
    </button>
  )
}
