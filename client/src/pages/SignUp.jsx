import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {
  const [Values, setValues] = useState({
    username: '',
    email:'',
    password: '',
    address: '',
  })

  const navigate = useNavigate();

  const handlerChange = (e)=>{  // e--> event obj that react passes to event handlers
      const {name, value} = e.target;
      setValues({...Values, [name]: value})
  }

  const handlerSubmit = async()=>{
    try {
      if(Values.username===''||Values.email===''||Values.password===''||Values.address===''){
        alert("All fields are required")
      }else{
        const res = await axios.post('http://localhost:3500/api/user/signup',Values);
        // console.log(res.data)
        alert(res.data.message)
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
      alert(error.response.data.message)
    }
  }

  return (
    <div className='h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center'>
        <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
            <p className='text-zinc-200 text-xl'>Sign Up</p>
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
                <label className='text-zinc-400' htmlFor="email" >Email</label>
                <input type="email"
                  id='email'
                  className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                  placeholder='abc@gmail.com'
                  name='email'
                  required 
                  value={Values.email}
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
                <label className='text-zinc-400' htmlFor="address" >Address</label>
                <textarea type="text"
                  id='address'
                  className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                  placeholder='Enter your address....'
                  rows='5'
                  name='address'
                  required
                  value={Values.address}
                  onChange={handlerChange}   
                />
            </div>
            <div className='mt-4'>
                <button onClick={handlerSubmit} 
                 className='w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-zinc-300 hover:text-zinc-900 transition-all duration-300' >
                  SignUp
                </button>
            </div>
            <p className='flex mt-4 items-center justify-center text-zinc-200 font-semibold' >Or</p>
            <p className='flex mt-4 items-center justify-center text-zinc-500 font-semibold'>
              Already have an account? &nbsp; 
              <Link to='/login' className='hover:text-blue-500'>
                <u>LogIn</u>
              </Link>
            </p>
        </div>
    </div>
  )
}

export default SignUp