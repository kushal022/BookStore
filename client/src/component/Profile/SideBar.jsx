import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowRightFromBracket } from "react-icons/fa6";
import {useDispatch , useSelector} from 'react-redux'
import {authActions} from '../../store/auth'


const SideBar = ({data}) => {
    const dispatch = useDispatch();
    const role = useSelector((state)=> state.auth.role)
    const history = useNavigate()
    
    //todo- handler Logout:
    const handlerLogout = ()=>{
        dispatch(authActions.logout());
        dispatch(authActions.changeRole('user'));
        localStorage.clear('id')
        localStorage.clear('token')
        localStorage.clear('role')
        history('/')
    }

  return (
    <div className='bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-auto lg:h-[100%]'>
        <div className='flex items-center justify-center flex-col'>
            <img src={data.img} className='h-[10vh]' alt="avatar" />
            <p className='mt-3 text-xl text-zinc-100 font-semibold' >{data.username}</p>
            <p className='mt-1 text-normal text-zinc-300 ' >{data.email}</p>
            <div className='w-full mt-4 h-[1px] bg-zinc-500  lg:block'></div>
        </div>

        {role && role === 'user' && (
            <div className='w-full flex flex-col items-center justify-center mt-2  '>
                <Link to='/profile'
                    className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'
                    >
                    Favorite
                </Link>
                <Link to='/profile/orderHistory'
                    className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'
                    >
                    Order History
                </Link>
                <Link to='/profile/settings'
                    className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'
                    >
                    Setting
                </Link>
            </div>
        )}

        {role && role === 'admin' && (
            <div className='w-full flex flex-col items-center justify-center mt-2  '>
                <Link to='/profile'
                    className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'
                    >
                    All Orders
                </Link>
                <Link to='/profile/addBook'
                    className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'
                    >
                    Add Book
                </Link>
            </div>
        )}
       
        <button onClick={handlerLogout} 
            className='bg-zinc-900  lg:w-full rounded px-4 py-2 mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center hover:bg-white hover:text-zinc-900 transition-all duration-300 '>
            Log Out <FaArrowRightFromBracket className='ms-4'/> 
        </button>
    </div>
  )
}

export default SideBar