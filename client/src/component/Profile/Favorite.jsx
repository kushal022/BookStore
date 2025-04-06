import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BookCard from '../BookCard/BookCard'
import { GiEmptyMetalBucket } from "react-icons/gi";

const Favorite = () => {
  const [FavoriteBooks, setFavoriteBooks] = useState()
  const  headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(()=>{
    try {
      const fetch = async()=>{
        const res = await axios.get('http://localhost:3500/api/favorite/getAllBooksFromFavorite',
          {headers},
        );
        // console.log(res.data.data)
        setFavoriteBooks(res.data.data)
      }
      fetch();
    } catch (error) {
      console.log(error)
    }
  },[FavoriteBooks])

  return (
    <>
      {FavoriteBooks && FavoriteBooks.length === 0 && 
        <div className='flex flex-col items-center justify-center w-full h-[100%] text-5xl font-semibold text-zinc-500' >
          <p>No Favorite Books</p>
          <GiEmptyMetalBucket  className='text-9xl'/>
        </div>}
    <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-6'>
      
      {FavoriteBooks && FavoriteBooks.map((item,i)=>(
        <div key={i} className=''>
          <BookCard data={item} favorite={true} className=' '/>
        </div>
      ))}
    </div>
    </>
  )
}

export default Favorite