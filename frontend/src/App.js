import { useEffect, useState } from "react";
import Todo from "./components/todo";
import { addTodo, getAllTodo, updateTodo,deleteTodo } from "./utils/handle-api";
function App() {

  const [todo,setTodo] = useState([])
  const [text,setText] = useState("") 
  const [isUpdating, setIsUpdating] = useState(false)
  const [toDoId,setTodoId] = useState("")

  
  useEffect(() =>{
    getAllTodo(setTodo)
  },[])

  const updateMode = (_id,text)=>{
    setIsUpdating(true)
    setText(text)
    setTodoId(_id)
  }

  return (
    <div className="App">
     <div className="container"> 
      <h1> TASK MANAGER </h1>

      <div className="top"> 
          <input 
          type ="text" 
          placeholder="Add ToDo"
          value={text}
          onChange={(e) => setText(e.target.value)}
          />

          <div 
            className ="add"
            onClick={isUpdating?()=> 
              updateTodo(toDoId,text,setTodo,setText,setIsUpdating)
            :() =>addTodo(text,setText,setTodo)}
            > 
            {isUpdating?"Update":"Add"}
          </div>
      </div>

      <div className="list">
        {todo.map((item)=> <Todo 
          key={item._id} 
          text={item.text}
          updateMode={() => updateMode(item._id, item.text)}
          deleteTodo={() => deleteTodo(item._id, setTodo)}
          />)}   
      </div>
     </div>
    </div>
  );
}

export default App;