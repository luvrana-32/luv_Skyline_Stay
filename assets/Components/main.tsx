import { useEffect } from "react"
import { useReducer } from "react"
import { useState } from "react"
import { useRef } from "react"
import { Task } from "./Types"
import { reducer } from "../reducer/taskreducer"
import { TaskList } from "./Tasklist"
export default function TaskManager() {
  const [tasks, dispatch] = useReducer(reducer, [])

  const [text, setText] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const renderCount = useRef(0)

  useEffect(() => {
    inputRef.current?.focus()

    const stored = localStorage.getItem('tasks')
    if (stored) {
      const parsed = JSON.parse(stored)
      parsed.forEach((task: Task) =>
        dispatch({ type: 'ADD', payload: task.text })
      )
    }
  }, [])

  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

 
  useEffect(() => {
    renderCount.current += 1
  })

 
  const addTask = () => {
    if (!text.trim()) return
    dispatch({ type: 'ADD', payload: text })
    setText('')
  }

  const toggleTask = (id: number) => {
    dispatch({ type: 'TOGGLE', payload: id })
  }

  const deleteTask = (id: number) => {
    dispatch({ type: 'DELETE', payload: id })
  }

  const total = tasks.length
  const completed = tasks.filter(t => t.completed).length

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h2>Task Manager</h2>

      <input
        ref={inputRef}
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Enter task..."
      />

      <button onClick={addTask}>Add</button>

      <p>Render Count: {renderCount.current}</p>

      <p>
        Total: {total} | Completed: {completed}
      </p>

      <TaskList
        tasks={tasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />
    </div>
  )
}