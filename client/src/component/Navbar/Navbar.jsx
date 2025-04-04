import React from 'react'
import { Link } from 'react-router-dom'

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
  return (
    <div className='bg-zinc-800 text-white px-8 py-2 flex items-center justify-between' >
        <Link to='/' className='flex items-center gap-3'>
            <img src="https://clipground.com/images/book-logo-png-14.png" 
            alt="logo" 
            className='h-10 py-1'
            />
            <h1 className='text-2xl font-semibold'>BookStore</h1>
        </Link>
        <div className='flex items-center gap-4'>
            <div className='flex gap-4'>
            {links.map((item,i)=>(
                <Link to={item.link} className='hover:text-blue-500 transition-all duration-300' key={i}>{item.title}</Link>
            ))}
            </div>
            <div className='flex gap-4'>
                <Link to='/login' className='px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 '  >LogIn</Link>
                <Link to='/signup' className='px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 '  >SignUp</Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar