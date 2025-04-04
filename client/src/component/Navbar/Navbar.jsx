import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaGripLines } from "react-icons/fa";

const Navbar = () => {
    const links = [
        {
            title: "Home",
            link: "/",
        },{
            title: "About Us",
            link: "/about",
        },{
            title: "All Books",
            link: "/all-books",
        },{
            title: "Cart",
            link: "/cart",
        },{
            title: "Profile",
            link: "/profile",
        },
    ]

    const [mobileNav, setMobileNav] = useState(true)
  return (
    <>
    <nav className='bg-zinc-800 text-white px-8 py-2 flex items-center justify-between z-50 relative' >
        <Link to='/' className='flex items-center gap-3'>
            <img src="https://clipground.com/images/book-logo-png-14.png" 
            alt="logo" 
            className='h-10 py-1'
            />
            <h1 className='text-2xl font-semibold'>BookStore</h1>
        </Link>
        <div className='nav-links-bookstore block md:flex items-center gap-4'>
            <div className='hidden md:flex gap-4'>
                {links.map((item,i)=>(
                    <Link to={item.link} className='hover:text-blue-500 transition-all duration-300' key={i}>{item.title}</Link>
                ))}
            </div>
            <div className='hidden md:flex gap-4'>
                <Link to='/login' className='px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 '  >LogIn</Link>
                <Link to='/signup' className='px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 '  >SignUp</Link>
            </div>
            <button className='text-white text-2xl sm:block md:hidden hover:text-zinc-400'
                onClick={()=>setMobileNav(!mobileNav)}>
                <FaGripLines/>
            </button>
        </div>
    </nav>
    <div className={`${mobileNav?"block":"hidden"} bg-zinc-800 h-full pt-4 absolute top-15 left-0 w-full z-40 text-white`} >
        <div className='flex flex-col items-center gap-4'>
            {links.map((item,i)=>(
                <Link to={item.link} onClick={()=>setMobileNav(!mobileNav)} className=' font-semibold hover:text-blue-500 transition-all duration-300' key={i}>{item.title}</Link>
            ))} 
            <Link to='/login' onClick={()=>setMobileNav(!mobileNav)} className='px-5 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 '  >LogIn</Link>
            <Link to='/signup' onClick={()=>setMobileNav(!mobileNav)} className='px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 '  >SignUp</Link>
        </div>
    </div>
    </>
  )
}

export default Navbar