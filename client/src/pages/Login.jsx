import React from 'react'
import {Link} from 'react-router-dom'

const Login = () => {
  return (
    <div className='h-[100vh] bg-zinc-900 px-12 py-8 flex items-center justify-center'>
        <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
            <p className='text-zinc-200 text-xl'>LogIn</p>
            <div className='mt-4'>
                <label className='text-zinc-400' htmlFor="username" >Username</label>
                <input type="text"
                  id='username'
                  className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                  placeholder='username'
                  name='username'
                  required  
                />
            </div>
            <div className='mt-4'>
                <label className='text-zinc-400' htmlFor="password" >Password</label>
                <input type="password"
                  id='password'
                  className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                  placeholder='password'
                  name='password'
                  required  
                />
            </div>
            <div className='mt-4'>
                <button className='w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-zinc-300 hover:text-zinc-900 transition-all duration-300' >
                  LogIn
                </button>
            </div>
            <p className='flex mt-4 items-center justify-center text-zinc-200 font-semibold' >Or</p>
            <p className='flex mt-4 items-center justify-center text-zinc-500 font-semibold'>
              Don't have an account? &nbsp; 
              <Link to='/Signup' className='hover:text-blue-500'>
                <u>Sign Up</u>
              </Link>
            </p>
        </div>
    </div>
  )
}

export default Login