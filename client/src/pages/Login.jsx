import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { authActions } from '../store/auth'
import {useDispatch} from "react-redux"


const Login = () => {
   const [Values, setValues] = useState({
      username: '',
      password: '',
    })
  
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handlerChange = (e)=>{  // e--> event obj that react passes to event handlers
      const {name, value} = e.target;
      setValues({...Values, [name]: value})
    }
    
    const handlerSubmit = async()=>{
      try {
        if(Values.username===''||Values.password===''){
          alert("All fields are required")
        }else{
          const res = await axios.post('http://localhost:3500/api/user/signin',Values);
          
          // console.log(res.data)
          
          //update login state and role:
          dispatch(authActions.login())
          dispatch(authActions.changeRole(res.data.role))
          
          //set to localStorage:
          localStorage.setItem('id', res.data.id)
          localStorage.setItem('role', res.data.role)
          localStorage.setItem('token', res.data.token)
          alert(res.data.message)
          navigate('/profile')
        }
      } catch (error) {
        console.log(error)
        alert(error.response.data.message)
      }
    }

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
                  value={Values.username}
                  onChange={handlerChange}  
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
                  value={Values.password}
                  onChange={handlerChange}
                />
            </div>
            <div className='mt-4'>
                <button onClick={handlerSubmit} 
                  className='w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-zinc-300 hover:text-zinc-900 transition-all duration-300' >
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