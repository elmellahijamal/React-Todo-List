import { useEffect, useState } from "react"
import TodoInput from "./Components/TodoInput"
import TodoList from "./Components/TodoList"

function App() {


  const [todos,setTodos] = useState(['Gym','eat','sleep']);
  const [todoValue,setTodoValue] = useState('')

  function pessistData(newList){
    localStorage.setItem('todos', JSON.stringify({todos : newList}))
  }

  function handleAddTodos(newTodo){
    const newTodoList = [...todos, newTodo]
    pessistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleDeleteTodos(index){
    const newTodoList = todos.filter((todo, todoIndex) => {
        return todoIndex !== index
    })
    pessistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleEditTodos(index){
    const valueToBeEdited = todos[index]
    setTodoValue(valueToBeEdited)
    handleDeleteTodos(index)
  }

  useEffect(() => {
    if (!localStorage) {
      return
    }
    let localTodos = localStorage.getItem('todos')
    if (!localTodos) {
        return
    }
    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)
  },[])


  return (
    <>
      <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos}/>
      <TodoList handleDeleteTodos={handleDeleteTodos} todos={todos} handleEditTodos={handleEditTodos}/>
    </>
  )
}

export default App
