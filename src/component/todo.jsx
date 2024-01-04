import {useState} from "react"
import uuid from 'react-uuid';






function Todo() {
    let [input, setInput] = useState("")
    let [list, setList] = useState({id: uuid(), text: "clean the house" },
    { id: uuid(), text: "buy milk" })
    

    const handleInput = (e) => {
        setInput(e.target.value);
      };


    const createNewToDoItem = () => {
        const newToDo = { id: uuid(), text: {input} };
        setList([...list, newToDo]);
        console.log("seeeeeeeeeeeeeeeeeeeeeeeee",list)
    
      };


      
  
    



    return (
        <>
 
       
 <div className="ToDoInput">
          <input type="text"  onChange={handleInput} />
          <button className="ToDo-Add" type="submit" onClick={createNewToDoItem}>Add task</button>
          <ul>
      {data.hits.map(item => (
        <li key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </ul>
          </div>  
       </>
        

    )        


    

    



    
}

export default Todo