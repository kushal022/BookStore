import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import BookCard from '../BookCard/BookCard';
import { useParams } from 'react-router-dom'
import { MdLanguage } from "react-icons/md";

const BookDetails = () => {
    const {id} = useParams();
    const [Data, setData] = useState();
    
    useEffect(()=>{
        const fetch = async()=>{
            const res = await axios.get(`http://localhost:3500/api/book/getBookById/${id}`);
            setData(res.data.data)
            // console.log(res)
        }
        fetch()
    },[])

  return (
    <div className='px-4 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8'>
        {!Data && <div className='w-full h-screen flex  items-center justify-center'><Loader/></div>}
        { Data && 
            (<> 
                <div className='bg-zinc-800 rounded p-4 h-[60vh] lg:h-[88vh] w-full lg:w-3/6 flex  items-center justify-center'>
                    <img src={ Data.url} className='h-[50vh] lg:h-[70vh] rounded' alt="bookImage" />
                </div>
                <div className='p-4 w-full lg:w-3/6' >
                    <h1 className='text-4xl text-zinc-300 font-semibold'>{Data.title}</h1>
                    <p className='text-zinc-400 mt-1'>by {Data.author}</p>
                    <p className='text-zinc-500 mt-4'>{Data.description}</p>
                    <p className='text-zinc-400 mt-4 flex items-center justify-start capitalize'>
                        <MdLanguage className='me-3' />{Data.language}
                    </p>
                    <p className='text-zinc-100 mt-4 text-3xl font-semibold'>Price : ₹ {Data.price}</p>
                </div>
            </>)}
    </div>
  )
}

export default BookDetails