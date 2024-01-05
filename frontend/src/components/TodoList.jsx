import React from 'react'
import TodoItem from './TodoItem'

const TodoList = ({todos , fetchTodoList}) => {
    return (
        <div>
            {todos.map((todo) => (
            <TodoItem key={todo._id} todo={todo} fetchTodoList={fetchTodoList}/>
            ))}
        </div>
    )
}

export default TodoList