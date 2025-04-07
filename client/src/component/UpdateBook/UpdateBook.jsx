import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBook = () => {
    const navigate = useNavigate();
    const {id} = useParams(); // bookId

    const [BookData, setBookData] = useState({
         url: '',
         title:'',
         author:'',
         price:'',
         description:'',
         language:'',
     });
     
    //todo: Headers:
     const headers = {
         id: localStorage.getItem('id'),
         authorization: `Bearer ${localStorage.getItem('token')}`,
         bookid: id,
     };

     //todo:  Get book by id: 
    useEffect(()=>{
        const fetch = async()=>{
            const res = await axios.get(`http://localhost:3500/api/book/getBookById/${id}`);
            setBookData(res.data.data)
            // console.log(res)
        }
        fetch()
     },[])
     
     //todo: Handler for Change
     const handlerChange = (e)=>{
         const name = e.target.name;
         const value = e.target.value;
         setBookData({...BookData, [name]:value});
     };
     
     //todo: Handler for Submit Update Book
     const handlerSubmitUpdateBook = async()=>{
         try {
             if(BookData.url === '' ||
                 BookData.title === '' ||
                 BookData.author === '' ||
                 BookData.price === '' ||
                 BookData.description === '' ||
                 BookData.language === ''
             ){alert('All fields are required')}
             else{
                 const res = await axios.put(
                     'http://localhost:3500/api/book/updateBook',
                     BookData,
                     {headers}
                 );
                 // console.log(res.data.message)
                 setBookData({
                   url: "",
                   title: "",
                   author: "",
                   price: "",
                   description: "",
                   language: "",
                 });
                 alert(res.data.message)
                 navigate(`/bookDetails/${id}`)
             }
         } catch (error) {
             console.log(error)
             alert(error.response.data.message)
         }
     }
 
 
   return (
     <div className='h-[100%] p-0 md:p-4 bg-zinc-900'>
         <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>Update Book</h1>
         <section className='p-4 bg-zinc-800 rounded'>
             <div>
                 <label htmlFor="" className='text-zinc-400  uppercase '>Image</label>
                 <input
                     className='w-full mt-2 p-2 bg-zinc-900 text-zinc-100 outline-none'
                     placeholder='url of image'
                     required
                     name='url'
                     value={BookData.url}
                     onChange={handlerChange} 
                     type="text" />
             </div>
             <div className='mt-4'>
                 <label htmlFor="" className='text-zinc-400 uppercase'>Title of Book</label>
                 <input
                     className='w-full mt-2 p-2 bg-zinc-900 text-zinc-100 outline-none'
                     placeholder='Title of Book'
                     required
                     name='title'
                     value={BookData.title}
                     onChange={handlerChange} 
                     type="text" />
             </div>
             <div className='mt-4'>
                 <label htmlFor="" className='text-zinc-400 uppercase'>author of Book</label>
                 <input
                     className='w-full mt-2 p-2 bg-zinc-900 text-zinc-100 outline-none'
                     placeholder='author of Book'
                     required
                     name='author'
                     value={BookData.author}
                     onChange={handlerChange} 
                     type="text" />
             </div>
             <div className='flex  w-full gap-4'>
             <div className='mt-4 w-3/6'>
                 <label htmlFor="" className='text-zinc-400 uppercase'>Language</label>
                 <input
                     className='w-full mt-2 p-2 bg-zinc-900 text-zinc-100 outline-none'
                     placeholder='Language of Book'
                     required
                     name='language'
                     value={BookData.language}
                     onChange={handlerChange} 
                     type="text" />
             </div>
             <div className='mt-4 w-3/6'>
                 <label htmlFor="" className='text-zinc-400 uppercase'>Price</label>
                 <input
                     className='w-full mt-2 p-2 bg-zinc-900 text-zinc-100 outline-none'
                     placeholder='Price of Book'
                     required
                     name='price'
                     value={BookData.price}
                     onChange={handlerChange} 
                     type="number" />
             </div>
             </div>
             <div className='mt-4'>
                 <label htmlFor="" className='text-zinc-400 uppercase'>Description of Book</label>
                 <textarea
                     className='w-full mt-2 p-2 bg-zinc-900 text-zinc-100 outline-none'
                     placeholder='desc of Book'
                     required
                     name='description'
                     rows='5'
                     value={BookData.description}
                     onChange={handlerChange} 
                 ></textarea>
             </div>
             <button onClick={handlerSubmitUpdateBook} 
                 className='mt-4 px-3 bg-blue-500 font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300'>
                 Update Book
             </button>
         </section>
     </div>
   )
}

export default UpdateBook