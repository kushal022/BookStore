import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import { GiEmptyMetalBucket } from "react-icons/gi";
import { Link } from 'react-router-dom';


const UserOrderHistory = () => {
  const [OrderHistory, setOrderHistory] = useState()

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  }

  //todo: get order history:
  useEffect(()=>{
    try {
      const fetch =async()=>{
        const res = await axios.get('http://localhost:3500/api/order/orderHistory',
          {headers},
        );
        setOrderHistory(res.data.data)
      }
    fetch()
    } catch (error) {
      console.log(error)
      alert(error.response.data.message)
    }
  },[])


  return (
    <div>
      {!OrderHistory && (
        <div className="flex items-center justify-center h-screen w-full ">
          <Loader />
        </div>
      )}
      {OrderHistory && OrderHistory.length === 0 && (
        <div className="h-[88vh]">
          <div className="h-[100%] flex flex-col items-center justify-center">
            <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
              No Order History
            </h1>
            <GiEmptyMetalBucket className="text text-9xl text-zinc-500 mb-8" />
          </div>
        </div>
      )}
      {OrderHistory && OrderHistory.length > 0 && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Your Order History
          </h1>
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <h1>Sr.</h1>
            </div>
            <div className="w-[22%]">
              <h1>Books</h1>
            </div>
            <div className="w-[45%]">
              <h1>Description</h1>
            </div>
            <div className="w-[9%]">
              <h1>Price</h1>
            </div>
            <div className="w-[16%]">
              <h1>Status</h1>
            </div>
            <div className="w-none md:w-[5%] hidden md:block">
              <h1>Mode</h1>
            </div>
          </div>

          {OrderHistory.map((item, i) => (
            <div className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer">
              <div className="w-[3%]">
                <h1 className='text-center'>{i +1}</h1>
              </div>
              <div className="w-[22%]">
                <Link
                  to={`/bookDetails/${item.book._id}`}
                  className='hover:text-blue-300'
                >
                  {item.book.title}
                </Link>
              </div>
              <div className="w-[45%]">
                <h1>{item.book.description.slice(0,50)} . . .</h1>
              </div>
              <div className="w-[9%]">
                <h1>₹ {item.book.price}</h1>
              </div>
              <div className="w-[16%]">
                <h1 className={item.status === "Order Placed" ? 'text-yellow-500' : 
                  item.status === "Canceled" && 'text-red-500'
                }>
                  {item.status}
                </h1>
              </div>
              <div className="w-none md:w-[5%] hidden md:block">
                <h1 className='text-sm text-zinc-400'>COD</h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserOrderHistory