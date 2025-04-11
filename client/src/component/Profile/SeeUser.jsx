import React from 'react'
import { RiCloseLargeFill } from "react-icons/ri";

const SeeUser = ({userDiv,setUserDiv,userDivData}) => {
  return (
    <div className=''>
        <div className={`${userDiv} top-0 left-0 h-screen w-full bg-zinc-800 opacity-80`}></div>
        <div className={`${userDiv} top-0 left-0 h-screen w-full flex items-center justify-center `}>
            <div className='bg-zinc-500 rounded p-4 w-[88%] md:w-[50%] lg:w-[40%]'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-2xl font-semibold'>User Information</h1>
                    <button className='hover:text-red-500' 
                        onClick={()=> setUserDiv('hidden')}><RiCloseLargeFill /></button>
                </div>
                <div className='mt-2'>
                    <label htmlFor="">
                        Username: <span className='font-semibold'>{userDivData.username}</span>
                    </label>
                </div>
                <div className='mt-4'>
                    <label htmlFor="">
                        Email: <span className='font-semibold'>{userDivData.email}</span>
                    </label>
                </div>
                <div className='mt-4'>
                    <label htmlFor="">
                        Address: <span className='font-semibold'>{userDivData.address}</span>
                    </label>
                </div>
            </div>
        </div>
        <div className=''></div>
        
    </div>
  )
}

export default SeeUser