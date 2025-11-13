export default function StatsBar(){
  const items=[
    {label:'Running', value:3},
    {label:'Queued', value:5},
    {label:'Completed', value:18},
    {label:'Errors', value:1},
  ]
  return (
    <div className="stats-bar p-6 rounded-2xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((it)=> (
          <div key={it.label} className="stat-card p-5 rounded-xl border">
            <div className="text-sm text-slate-500">{it.label}</div>
            <div className="stat-number leading-none">{it.value}</div>
          </div>
        ))}
      </div>
      <style>{`
        .stats-bar{background:linear-gradient(180deg, rgba(99,102,241,0.03) 0%, transparent 100%);backdrop-filter:blur(8px);box-shadow:0 8px 32px rgba(99,102,241,0.12)}
        .stat-card{background:rgba(255,255,255,.8);border-color:rgba(255,255,255,.2);transition:all .2s cubic-bezier(.4,0,.2,1)}
        .stat-card:hover{transform:translateY(-2px);box-shadow:0 12px 48px rgba(99,102,241,.18)}
        .stat-number{font-size:32px;font-weight:700;background:linear-gradient(135deg,#6366f1 0%, #8b5cf6 50%, #06b6d4 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
      `}</style>
    </div>
  )
}
