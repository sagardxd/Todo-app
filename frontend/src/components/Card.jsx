import React from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { motion } from "framer-motion"
import axios from 'axios';

const Card = ({ todo, fetchTodoList, dragRef }) => {

    // Handler for deleting the Todo
    const deleteHandler = async () => {
        try {
            await axios.delete('http://localhost:3000/todo', {
                data: { id: todo._id }
            });
        } catch (error) {
            console.error('Error:', error);
        }
        fetchTodoList();
    }


    // Handler for updating the Todo
    const completedHandler = async () => {
        try {
            await axios.put('http://localhost:3000/completed', {
                id: todo._id
            });
        } catch (error) {
            console.error('Error:', error);
        }
        fetchTodoList();
    }

    const renderDescription = () => {
        return todo.description.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));
    };


    return (
        <motion.div drag dragConstraints={dragRef} whileDrag={{ scale: 1.2 }} dragTransition={{ bounceStiffness: 100, bounceDamping: 10 }}
            className=' relative flex-shrink-0 w-60 h-72 rounded-[40px] bg-zinc-900 text-white px-8 py-6 overflow-hidden'>
            <div className='flex items-end justify-end'>
                <MdDeleteOutline size={18} onClick={deleteHandler} /></div>
            <p className='text-xl font-semibold '>{todo.title} </p>
            <p className='leading-tight mt-3'>{renderDescription()}</p>

            <div onClick={completedHandler}
                className={`absolute bottom-0 ${todo.completed ? 'bg-green-600' : 'bg-rose-600'} w-full h-[18%] left-0 flex justify-center items-center p-2`}>
                <h5>{todo.completed ? 'Completed' : 'Not Done'}</h5>
            </div>
        </motion.div>
    )
}

export default Card