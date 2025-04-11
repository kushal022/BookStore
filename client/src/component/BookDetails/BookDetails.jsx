import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import BookCard from '../BookCard/BookCard';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MdLanguage } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useSelector } from 'react-redux'

const BookDetails = () => {
    const {id} = useParams(); // bookId
    const [Data, setData] = useState();
    const navigate = useNavigate();

    const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn)
    const role = useSelector((state)=> state.auth.role)

    //todo:  Get book by id: 
    useEffect(()=>{
        const fetch = async()=>{
            const res = await axios.get(`http://localhost:3500/api/book/getBookById/${id}`);
            setData(res.data.data)
            // console.log(res)
        }
        fetch()
    },[])

    //todo:  Headers: 
    const headers = {
        id:localStorage.getItem('id'),
        authorization: `Bearer ${localStorage.getItem('token')}`,
        bookid: id,
    };

    //todo:  Add to favorite: 
    const handlerFavorites = async()=>{
        try {
            const res = await axios.put('http://localhost:3500/api/favorite/addBookToFavorite',
                {},
                {headers}
            );
            // console.log(res)
            alert(res.data.message)
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    //todo: Add to Cart:
    const handlerCart = async()=>{
        try {
            const res = await axios.put('http://localhost:3500/api/cart/addBookInCart',
                {},
                {headers}
            );
            // console.log(res)
            alert(res.data.message)
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    //todo: Handler Delete Book:
    const handlerDeleteBook = async()=>{
        try {
            const res = await axios.delete('http://localhost:3500/api/book/deleteBook',
                {headers}
            );
            // console.log(res)
            alert(res.data.message)
            navigate('/all-books')
        } catch (error) {
            console.log(error)
        }
    }
   
    //todo: Handler Edit Book:
    const handlerEditBook = async()=>{
        try {
            const res = await axios.put('http://localhost:3500/api/book/updateBook',
                {headers}
            );
            // console.log(res)
            alert(res.data.message)
            navigate('/all-books')
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <div className='px-4 md:px-12 h-full py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8'>
        {!Data && <div className='w-full h-screen flex  items-center justify-center'><Loader/></div>}
        { Data && 
            (<> 
                <div className=' w-full lg:w-3/6 '>
                    <div className='bg-zinc-800 rounded px-4 py-12 flex flex-col md:flex-row justify-around'>
                        <img src={ Data.url} className='h-[50vh] lg:h-[70vh] rounded' alt="bookImage" />
                        {isLoggedIn === true && role === 'user' &&
                            <div className='flex flex-row md:flex-col justify-between md:justify-start gap-4 mt-5 md:mt-0'>
                                <button onClick={handlerFavorites} 
                                    className='bg-white rounded md:rounded-full text-2xl px-6 py-2 md:p-2 text-red-500 flex items-center justify-center'>
                                    <FaRegHeart /><span className='ms-4 block md:hidden'>Favorites</span>
                                </button>
                                <button onClick={handlerCart} 
                                    className='bg-blue-500 rounded md:rounded-full text-2xl px-6 py-2 md:p-2 text-white flex items-center justify-center'>
                                    <IoCartOutline /><span className='ms-4 block md:hidden'>Add to cart</span>
                                </button>
                            </div>
                        }
                        {isLoggedIn === true && role === 'admin' &&
                            <div className='flex flex-row md:flex-col justify-between md:justify-start gap-4 mt-5 md:mt-0'>
                                <Link to={`/updateBook/${id}`} 
                                    className='bg-blue-500 rounded md:rounded-full text-2xl px-6 py-2 md:p-2 text-white flex items-center justify-center'>
                                    <MdEditSquare /><span className='ms-4 block md:hidden'>Edit</span>
                                </Link>
                                <button onClick={handlerDeleteBook} 
                                    className='bg-white rounded md:rounded-full text-2xl px-6 py-2 md:p-2 text-red-500 flex items-center justify-center'>
                                    <RiDeleteBin6Fill /><span className='ms-4 block md:hidden'>Delete Book</span>
                                </button>
                            </div>
                        }
                    </div>
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