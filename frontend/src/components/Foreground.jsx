import React, { useRef, useState } from 'react'
import Card from './Card'
import { IoAdd } from "react-icons/io5";
import CreateTodo from './CreateTodo';
import { IoIosCloseCircle } from "react-icons/io";
import { motion } from 'framer-motion';


const Foreground = ({ todos, fetchTodoList }) => {
    const ref = useRef(null);
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    return (
        <div ref={ref} className='fixed top=0 left-0 z-[3] w-full h-full flex gap-5 flex-wrap p-5'>
            <motion.div whileHover={{ scale: 1.3 }}
                onClick={togglePopup} className=' cursor-pointer absolute top-[5%] left-[90%] z-[4] w-16 h-16 bg-zinc-600 flex justify-center items-center rounded-full'>
                <IoAdd size={30} color='white' />
            </motion.div>

            {showPopup && (
                <div className='fixed z-[5] w-[30%] h-[50%] top-1/2 left-1/2 transform -translate-x-1/2 overflow-hidden rounded-[10%] -translate-y-1/2 bg-zinc-600/60 border border-gray-900 p-4'>
                    <span className='absolute top-2 right-2 cursor-pointer' onClick={togglePopup}>
                        <IoIosCloseCircle size={26} className='m-5' />
                    </span>
                    <div className='reative'>
                        <CreateTodo fetchTodoList={fetchTodoList} closePopUp={togglePopup} />
                    </div>
                </div>
            )}
            {todos.map((todo) => (
                <Card key={todo._id} todo={todo} fetchTodoList={fetchTodoList} dragRef={ref} />
            ))}

        </div>
    )
}

export default Foreground