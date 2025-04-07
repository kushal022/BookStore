import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'

const Settings = () => {
  const [Value, setValue] = useState()
  const [ProfileData, setProfileData] = useState()
  //todo: headers
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  }

  //todo: handler for change
  const handlerOnChange=(e)=>{
    const {name,value} = e.target;
    setValue({...Value, [name]: value});
  }

  //todo: fetch user data
  useEffect(()=>{
    try {
      const fetch = async()=>{
        const res = await axios.get('http://localhost:3500/api/user/getUser',
          {headers}
        );
        setProfileData(res.data)
        setValue({address: res.data.address})
      };
      fetch();
    } catch (error) {
      console.log(error)
    }
  },[])

  //todo: handler for update address:
  const handlerUpdateAddress = async()=>{
    try {
      const res = await axios.put('http://localhost:3500/api/user/updateUserAddress',
        Value,
        {headers}
      );
      console.log(res)
      alert(res.data.message)
    } catch (error) {
      console.log(error)
      alert(error.response.data.message)
    }
  }
  return (
    <div>
      {!ProfileData && <div className='flex items-center justify-center w-full h-screen'><Loader/></div> }
      {ProfileData && (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500'>Setting</h1>
          <section className='flex gap-12 pt-6'>
            <div>
              <label htmlFor="">Username</label>
              <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>{ProfileData.username}</p>
            </div>
            <div>
              <label htmlFor="">Email</label>
              <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>{ProfileData.email}</p>
            </div>
          </section>
          <div className='mt-4 flex flex-col'>
              <label htmlFor="">Address</label>
              <textarea
                  className='p-2 mt-2 rounded bg-zinc-800 font-semibold'
                  rows='5'
                  placeholder='Address' 
                  name="address"
                  value={Value.address} 
                  onChange={handlerOnChange}
                  id="">

              </textarea>
          </div>
          <div className='mt-4 flex justify-end'>
            <button onClick={handlerUpdateAddress} 
              className='bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-300 duration-300 transition-all'>
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Settings