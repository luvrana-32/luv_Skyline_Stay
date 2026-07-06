import { Task } from "../Components/Types"
import { Action } from "../Components/Types"
export function reducer(state: Task[], action: Action): Task[] {
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload,
          completed: false,
        },
      ]

    case 'TOGGLE':
      return state.map(task =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      )

    case 'DELETE':
      return state.filter(task => task.id !== action.payload)

    default:
      return state
  }
}