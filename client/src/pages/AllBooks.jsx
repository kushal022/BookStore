import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BookCard from '../component/BookCard/BookCard'
import Loader from '../component/Loader/Loader'

const AllBooks = () => {
   const [Data, setData] = useState();
  
    useEffect(()=>{
      const fetch = async()=>{
        const res = await axios.get('http://localhost:3500/api/book/getAllBooks');
        // console.log(res.data.data);
        setData(res.data.data)
      };
      fetch();
    },[])

  return (
    <div className='bg-zinc-900 h-auto px-12 py-8'>
      <h4 className='text-3xl text-yellow-100'>All Books</h4>
        {!Data && (
          <div className='flex items-center justify-center my-8'>
            <Loader/>
          </div>
        )}
        <div className='my-4 grid gap-8 grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
          {Data && Data.map((item,i)=>(
            <div key={i}><BookCard data={item} /></div>
          ))}
        </div>
    </div>
  )
}

export default AllBooks