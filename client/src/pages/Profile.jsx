import React, { useEffect, useState } from 'react'
import SideBar from '../component/Profile/SideBar'
import {Outlet} from 'react-router-dom'
import axios from 'axios'
import {useSelector} from 'react-redux'
import Loader from '../component/Loader/Loader'

const Profile = () => {
  // const isLoggedIn = useSelector();
  const [Profile, setProfile] = useState()

  const  headers = {
            id: localStorage.getItem('id'),
            authorization: `Bearer ${localStorage.getItem("token")}`,
          };

useEffect(()=>{
    const fetch = async()=>{
        const res = await axios.get('http://localhost:3500/api/user/getUser',
            { headers});
            // console.log(res)
            setProfile(res.data)
    }
    fetch();
},[])

  return (
    <div className="bg-zinc-900 px-12 flex flex-col md:flex-row gap-4 w-full h-screen py-8 text-white">
      {!Profile ? (
        <div className='w-full h-[100%] flex justify-center items-center' ><Loader /></div>
      ) : (
        <>
          <div className="w-full md:w-1/6">
            <SideBar data={Profile} />
          </div>

          <div className="w-full md:w-5/6">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
}

export default Profile