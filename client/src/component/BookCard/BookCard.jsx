import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
const BookCard = ({data, favorite}) => {

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid:data._id
  };
  const handlerRemoveBook = async()=>{
      try {
        const res = await axios.put('http://localhost:3500/api/favorite/removeBookFromFavorite',
          {},
          {headers}
        );
        // console.log(res)
        alert(res.data.message)
      } catch (error) {
        console.log(error)
      }
  }

  return (
    <div className='bg-zinc-800 rounded p-4 flex flex-col'>
    <Link to={`/bookDetails/${data._id}`}>
        <div className=' ' > 
            <div className='bg-zinc-900 rounded flex items-center justify-center'>
                <img src={data.url} alt="book"
                  className='h-[25vh]' />
            </div>
            <h2 className='mt-4 text-xl text-zinc-200 font-semibold'>{data.title}</h2>
            <p className='mt-1 text-zinc-400  ' >by {data.author}</p>
            <p className='mt-1 text-zinc-200 font-semibold text-xl' >₹ {data.price}</p>
        </div>
    </Link>
    {favorite && (
      <div className='flex items-center justify-center'>
        <button onClick={handlerRemoveBook} 
          className='bg-yellow-50 px-4 py-2 mt-4 rounded border border-yellow-500 text-yellow-500 '>
          Remove from favorite
        </button>
      </div>
    )}
    </div>
  )
}

export default BookCard