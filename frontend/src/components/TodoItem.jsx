import React from 'react'
import axios from 'axios';

const TodoItem = ({ todo, fetchTodoList }) => {

    const deleteHandler = async () => {
        try {
            await axios.delete('http://localhost:3000/todo', {
                data: { id: todo._id }
            });
        } catch (error) {
            console.error('Error:', error);
            // Handle errors or display appropriate messages
        }
        fetchTodoList();
    }

    const completedHandler = async () => {
        try {
            await axios.put('http://localhost:3000/completed', {
                data: { id: todo._id }
            });
        } catch (error) {
            console.error('Error:', error);
            // Handle errors or display appropriate messages
        }
        fetchTodoList();
    }

    return (
        <div>
            <h1>{todo.title}</h1>
            <p>{todo.description}</p>
            <p>{todo.completed}</p>
            <button onClick={completedHandler}>Mark as done</button>
            <button onClick={deleteHandler}>Delete</button>

        </div>
    )
}

export default TodoItem