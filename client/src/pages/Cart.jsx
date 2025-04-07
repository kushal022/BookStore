import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../component/Loader/Loader';
import { GiEmptyMetalBucket } from "react-icons/gi";
import { MdDeleteForever } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import {useNavigate} from 'react-router-dom'


const Cart = () => {
  const [Cart, setCart] = useState();
  const [Total, setTotal] = useState(0);
  const navigate = useNavigate()

  //todo: Headers:
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  }

  //todo: Handler Delete:
  const handlerDelete = async(bookid)=>{
    try {
      const res = await axios.put(`http://localhost:3500/api/cart/removeBookFromCart/${bookid}`,
        {},
        {headers}
      );
      // console.log(res)
      alert(res.data.message)
    } catch (error) {
      console.log(error)
      alert(error.response.data.message)
    }
  }

  //todo: Get Cart Books:
  useEffect(()=>{
    try {
      const fetch = async()=>{
          const res = await axios.get('http://localhost:3500/api/cart/getAllBooksFromCart',
            {headers}
          )
          // console.log(res.data.data)
          setCart(res.data.data)
      };
      fetch();
    } catch (error) {
      console.log(error)
    }
  },[Cart])

  //todo:  Total price: 
  useEffect(()=>{
    if(Cart && Cart.length > 0 ){
      let total = 0;
      Cart.map(item=>{
        total += item.price;
      })
      setTotal(total)
      total = 0;
    }
  },[Cart])

  //todo: Place Order Handler: 
  const handlerPlaceOrder = async()=>{
    try {
      const res = await axios.post('http://localhost:3500/api/order/placeOrder',
        {order: Cart},
        {headers},
      );
      // console.log(res)
      alert(res.data.message)
      navigate('/profile/orderHistory')
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='bg-zinc-900 px-12 h-screen py-8'>
      {/* ---------- Loader ---------------- */}
      {!Cart && <div className='flex items-center justify-center h-full'><Loader/></div>}
      {/* ---------- Empty Cart ---------------- */}
      {Cart && Cart.length === 0  && (
        <div className='h-screen'>
          <div className='h-[100%] flex items-center justify-center flex-col'>
            <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-400' >Empty Cart</h1>
            <GiEmptyMetalBucket  className='text-9xl font-semibold text-zinc-400'/>
          </div>
        </div>
      )}
      {/* ------------ Cart ---------------- */}
      {Cart && Cart.length > 0 && (
        <>
          <h1 className='text-2xl lg:text-4xl font-semibold text-zinc-500 mb-8 w-full flex gap-4 items-center justify-start'><FaShoppingCart /> Your Cart </h1>

          {Cart.map((item,i)=>(
            <div key={i} className='w-full my-4 rounded flex flex-col md:flex-row p-4  gap-6  items-center bg-zinc-800'>
              <img className='h-[20vh] md:h-[15vh] object-cover' 
                src={item.url} alt="bookImg" />
              <div className='w-full md:w-auto'>
                <h1 className='text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0'>
                  {item.title}</h1>
                <p className='text-zinc-100 text-normal mt-2 hidden lg:block'>
                  {item.description.slice(0,100)}...
                </p>
                <p className='text-zinc-100 text-normal mt-2 hidden md:block lg:hidden'>
                  {item.description.slice(0,65)}...
                </p>
                <p className='text-zinc-100 text-normal mt-2 block md:hidden'>
                  {item.description.slice(0,100)}...
                </p>
              </div>
              <div className='flex mt-4 w-full md:w-auto items-center justify-between'>
                <h2 className='text-zinc-100 text-3xl font-semibold flex'>₹ {item.price} </h2>
                <button onClick={()=>handlerDelete(item._id)}
                   className='bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12 md:text-2xl'>
                  <MdDeleteForever />
                </button>
              </div>
            </div>
          ))}
        </>
      )}
      {/* --------------- Place Order ------------------------ */}
      {Cart && Cart.length>0 && (
        <div className='mt-4 w-full flex items-center justify-center'>
          <div className='p-4 bg-zinc-800 rounded'>
            <h1 className='text-3xl text-zinc-200 font-semibold'>Total Amount</h1>
            <div className='mt-3 flex items-center justify-between text-xl text-zinc-200'>
              <h2>{Cart.length} Books</h2>
              <h2>₹ {Total}</h2>
            </div>
            <div className='w-[100%] mt-3'>
              <button onClick={handlerPlaceOrder} 
                className='bg-zinc-100 px-4 py-2 rounded flex justify-center w-full font-semibold hover:bg-zinc-400'>
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart