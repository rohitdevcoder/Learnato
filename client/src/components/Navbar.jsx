import React from 'react'
import { IoAddCircle } from "react-icons/io5";
import { useAppContext } from '../context/AppContext';

function Navbar() {
    const {setIsModalOpen} = useAppContext()
  return (
    <div className='w-full shadow-sm'>
     <div className='max-w-7xl mx-auto flex justify-between items-center py-3 px-4'>
     <div>
        <h2 className='text-2xl sm:text-3xl font-semibold'>Learnato</h2>
     </div>
     <div className='flex gap-2'>
     <button onClick={()=>setIsModalOpen(true)} className='px-4 bg-primary cursor-pointer py-1 rounded-full flex items-center text-white hover:bg-gray-700'><IoAddCircle className='mr-1'/> Create</button>
     <button className='px-4 text-red-600 cursor-pointer py-1 rounded-full border border-red-600 text-red hover:text-white hover:bg-red-600'>Logout</button>
     </div>
     </div>
    </div>
  )
}

export default Navbar