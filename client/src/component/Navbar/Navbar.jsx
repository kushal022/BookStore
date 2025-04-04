import React from 'react'

const Navbar = () => {
    const links = [
        {
            title: "Home",
            link: "/",
        },{
            title: "About Us",
            link: "/about-us",
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
        <div className='flex items-center gap-3'>
            <img src="https://clipground.com/images/book-logo-png-14.png" 
            alt="logo" 
            className='h-10 py-1'
            />
            <h1 className='text-2xl font-semibold'>BookStore</h1>
        </div>
        <div className='flex items-center gap-4'>
            <div className='flex gap-4'>
            {links.map((item,i)=>(
                <div className='hover:text-blue-500 transition-all duration-300' key={i}>{item.title}</div>
            ))}
            </div>
            <div className='flex gap-4'>
                <button className='px-2 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 '  >LogIn</button>
                <button className='px-2 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 '  >SignUp</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar