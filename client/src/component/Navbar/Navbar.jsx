import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaGripLines } from "react-icons/fa";
import {useSelector} from "react-redux"

const Navbar = () => {
    const links = [
        {
            title: "Home",
            link: "/",
        },{
            title: "All Books",
            link: "/all-books",
        },{
            title: "About Us",
            link: "/about",
        },{
            title: "Cart",
            link: "/cart",
        },{
            title: "Profile",
            link: "/profile",
        },
        {
            title: "Admin",
            link: "/profile",
        },
    ]

    const [mobileNav, setMobileNav] = useState(false);

    const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn);
    const role = useSelector((state)=> state.auth.role);

    if(isLoggedIn === false){
        links.splice(3,2)
    }
    if(isLoggedIn === true && role === "admin" ){
        links.splice(4,1)
    }
    if(isLoggedIn === true && role === "user" ){
        links.splice(5,1)
    }

  return (
    <>
    <nav className='bg-zinc-800 text-white px-8 py-2 flex items-center justify-between z-50 relative' >
        {/* ----------- Right Side ----------------------- */}
        <Link to='/' className='flex items-center gap-3'>
            <img src="https://clipground.com/images/book-logo-png-14.png" 
            alt="logo" 
            className='h-10 py-1'
            />
            <h1 className='text-2xl font-semibold'>BookStore</h1>
        </Link>
        {/* ----------- Left Side ----------------------- */}
        <div className='nav-links-bookstore block md:flex items-center gap-4'>
            <div className='hidden md:flex gap-4 items-center'>
                {links.map((item,i)=>(
                    <div key={i} >
                        { item.title === "Profile" || item.title === "Admin" ? 
                            <Link to={item.link} className='px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 ' key={i}>{item.title}</Link>
                        :
                            <Link to={item.link} className='hover:text-blue-500 transition-all duration-300' key={i}>{item.title}</Link>
                        }
                    </div>
                ))}
            </div>
            <div className='hidden md:flex gap-4'>
                {isLoggedIn === false ? <>
                    <Link to='/login' className='px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 '  >LogIn</Link>
                    <Link to='/signup' className='px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 '  >SignUp</Link>
                </>:<></>}
            </div>
        {/* ------------ Mobile Nav Button ------------------ */}
            <button className='text-white text-2xl sm:block md:hidden hover:text-zinc-400'
                onClick={()=>setMobileNav(!mobileNav)}>
                <FaGripLines/>
            </button>
        </div>
    </nav>

    {/* ------------ Mobile Nav ------------------ */}
    <div className={`${mobileNav?"block":"hidden"} block md:hidden bg-zinc-800 h-full pt-4 absolute top-15 left-0 w-full z-40 text-white`} >
        <div className='flex flex-col items-center gap-4'>
            {links.map((item,i)=>(
                <Link to={item.link} onClick={()=>setMobileNav(!mobileNav)} className=' font-semibold hover:text-blue-500 transition-all duration-300' key={i}>{item.title}</Link>
            ))} 
            {isLoggedIn === false ? (<>
                <Link to='/login' onClick={()=>setMobileNav(!mobileNav)} className='px-5 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 '  >LogIn</Link>
                <Link to='/signup' onClick={()=>setMobileNav(!mobileNav)} className='px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 '  >SignUp</Link>
            </>):<></>}
        </div>
    </div>
    </>
  )
}

export default Navbar