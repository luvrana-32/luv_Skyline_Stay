import { Task } from "./Types"
import { TaskItem } from "./TaskItem"
export function TaskList({
  tasks,
  onToggle,
  onDelete,
}: {
  tasks: Task[]
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}) {
  return (
    <ul>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}
