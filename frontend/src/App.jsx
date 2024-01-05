import { useEffect, useState } from 'react'
import axios from 'axios';
import Background from './components/Background';
import Foreground from './components/Foreground';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodoList();
  }, [])

  //Fetching todos from todolist
  const fetchTodoList = async () => {
    try {
      const response = await axios.get("http://localhost:3000/todos");
      setTodos(response.data.allTodos);
    } catch (error) {
      console.log('Not able to fetch todos:', error);
    }
  }

  return (<>
    <div className='relative w-full h-screen bg-zinc-800'>
      <Background />
      <Foreground todos={todos} fetchTodoList={fetchTodoList} />
    </div>

  </>
  )
}

export default App
