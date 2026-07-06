import type { Task } from "./Types"
export function TaskItem({
  task,
  onToggle,
  onDelete,
}: {
  task: Task;
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}) {
  return (
    <li style={{ marginBottom: 8 }}>
      <span
        onClick={() => onToggle(task.id)}
        style={{
          cursor: 'pointer',
          textDecoration: task.completed ? 'line-through' : 'none',
          marginRight: 10,
        }}
      >
        {task.text}
      </span>

      <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  )
}
