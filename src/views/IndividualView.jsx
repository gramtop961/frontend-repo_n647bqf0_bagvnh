import TaskCardIndividual from '../components/tasks/TaskCardIndividual'

export default function IndividualView({ tasks, onSelect }){
  return (
    <div className="grid gap-4">
      {tasks.length===0 && (
        <div className="text-slate-500 text-sm">No tasks yet. Create one from Chat.</div>
      )}
      {tasks.map(t => (
        <TaskCardIndividual key={t.id} task={t} onClick={()=> onSelect(t)} />
      ))}
    </div>
  )
}
