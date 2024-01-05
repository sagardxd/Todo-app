import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const CreateTodo = ({ fetchTodoList, closePopUp }) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const maxDescriptionLength = 100;

    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:3000/todo', {
                title: title,
                description: description
            });
        } catch (error) {
            console.error('Error:', error);
            // Handle errors or display appropriate messages
        }

        fetchTodoList();
        closePopUp();
        setTitle('');
        setDescription('');
    }
    function handleTitleChange(e) {
        setTitle(e.target.value);
    }
    function handleDescription(e) {
        setDescription(e.target.value);
    }
    return (
        <div className='flex flex-col justify-center align-items-center'>
            <form className='flex flex-col justify-center items-center mt-5'
                onSubmit={submitHandler}>
                <input
                    className='border w-[50%] bg-zinc-900 text-white h-14  p-2 m-2 rounded'
                    type='text'
                    placeholder='Title'

                    value={title}
                    onChange={handleTitleChange}
                />
                <textarea
                    className='border w-[50%] resize-none h-28 overflow-auto break-words  bg-zinc-900 text-white p-2 m-2 rounded'
                    type='text'
                    value={description}
                    onChange={handleDescription}
                    placeholder='Description'
                    rows={description.split('\n').length + 1}
                    maxLength={100}
                />
                <span className='text-sm text-white p-2 m-2'>{description.length}/{maxDescriptionLength} characters</span>
                <motion.button whileHover={{ scale: 1.2 }}
                    className=' h-10 w-[30%] text-white m-5 rounded-lg bg-zinc-900' type='submit'>Create Todo</motion.button>
            </form>

        </div>
    )
}

export default CreateTodo