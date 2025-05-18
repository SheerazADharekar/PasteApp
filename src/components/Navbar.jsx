import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-row gap-4 place-content-between mb-5  '>
        <NavLink to="/" className=" py-2 px-20 bg-white rounded text-black hover:bg-slate-200 border border-gray-400">Home</NavLink>
        <NavLink to="/pastes" className="py-2 px-20 bg-white rounded text-black hover:bg-slate-200 border border-gray-400">Paste</NavLink>
    </div>
  )
}

export default Navbar