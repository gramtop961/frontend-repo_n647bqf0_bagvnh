import { useMemo, useState } from 'react'

function Progress({ value=0 }){
  return (
    <div className="progress-bar w-full"><div className="progress-fill" style={{width:`${value}%`}}/></div>
  )
}

export default function DetailPanel({ task }){
  const [tab, setTab] = useState('Pipeline')
  const steps = task?.steps || []
  const logs = task?.logs || []

  const content = useMemo(()=>{
    if(tab==='Pipeline'){
      return (
        <div className="space-y-3">
          {steps.map((s,i)=> (
            <div key={i} className="pipeline-step">
              <div className={`step-icon ${s.status==='complete'?'step-complete': s.status==='running'?'step-running':''}`}></div>
              <div className="flex-1">
                <div className="flex items-center justify-between text-sm">
                  <span>{s.name}</span>
                  {typeof s.progress==='number' && <span>{s.progress}%</span>}
                </div>
                {typeof s.progress==='number' && <Progress value={s.progress} />}
              </div>
            </div>
          ))}
        </div>
      )
    }
    if(tab==='Canvas'){
      return (
        <div className="p-3 text-sm text-slate-500">Canvas preview appears here.</div>
      )
    }
    return (
      <div className="text-xs font-mono bg-white/60 rounded-lg p-3 space-y-2 max-h-[50vh] overflow-auto">
        {logs.map((l,idx)=> (<div key={idx}>• {l}</div>))}
      </div>
    )
  },[tab, steps, logs])

  return (
    <div className="detail-panel rounded-l-3xl p-4">
      <div className="mb-3">
        <div className="text-lg font-semibold">{task?.name || 'No task selected'}</div>
        {task && <div className="text-xs text-slate-500">{task.llm} • {task.status}</div>}
      </div>
      <div className="detail-tabs relative">
        {['Pipeline','Canvas','Logs'].map(t => (
          <button key={t} role="tab" aria-selected={tab===t} className={`detail-tab ${tab===t?'detail-tab-active text-white':''}`} onClick={()=>setTab(t)}>{t}</button>
        ))}
      </div>
      <div className="mt-4">
        {content}
      </div>
      <style>{`
        .detail-panel{background:rgba(30,41,59,0.8);backdrop-filter:blur(40px);border-left:1px solid rgba(255,255,255,0.1);box-shadow:-8px 0 48px rgba(99,102,241,0.15)}
        .detail-tabs{display:flex;gap:8px;border-bottom:1px solid rgba(255,255,255,0.1);padding:16px}
        .detail-tab{padding:8px 16px;border-radius:12px;transition:all .2s ease}
        .detail-tab-active{background:linear-gradient(135deg,#6366f1 0%, #8b5cf6 50%, #06b6d4 100%);}
        .progress-bar{height:6px;background:rgba(99,102,241,0.1);border-radius:9999px;overflow:hidden}
        .progress-fill{height:100%;background:linear-gradient(90deg,#f59e0b,#f97316);box-shadow:0 0 16px rgba(245,158,11,0.4);animation:shimmer 2s infinite;transition:width .5s ease}
        @keyframes shimmer{0%{opacity:.8}50%{opacity:1}100%{opacity:.8}}
        .pipeline-step{display:flex;align-items:center;gap:12px;padding:4px 0;font-size:14px}
        .step-icon{width:20px;height:20px;border-radius:9999px;background:rgba(148,163,184,.4)}
        .step-complete{background:linear-gradient(90deg,#10b981,#06b6d4);box-shadow:0 0 12px rgba(16,185,129,.4)}
        .step-running{background:linear-gradient(90deg,#f59e0b,#f97316);animation:pulse 2s infinite}
      `}</style>
    </div>
  )
}
