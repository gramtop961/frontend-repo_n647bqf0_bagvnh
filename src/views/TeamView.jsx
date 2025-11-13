import TaskCardTeam from '../components/tasks/TaskCardTeam'

export default function TeamView({ tasks, onSelect }){
  return (
    <div className="grid gap-4">
      {tasks.map(t => (
        <TaskCardTeam key={t.id} task={t} onClick={()=> onSelect(t)} />
      ))}
    </div>
  )
}
