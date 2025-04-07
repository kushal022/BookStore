import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from '../Loader/Loader'
import { FaUserLarge } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import SeeUser from './SeeUser';

const AllOrders = () => {
  const [AllOrders, setAllOrders] = useState();
  const [Options, setOptions] = useState(-1)
  const [StatusValue, setStatusValue] = useState({status:''})
  const [userDiv, setUserDiv] = useState('hidden')
  const [userDivData, setUserDivData] = useState()

  //todo: Headers
  const  headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  //todo: OnChange
  const handlerChange =(e)=>{
    const {value} = e.target;
    setStatusValue({status: value})
  } 

  //todo: Get All Orders:
  useEffect(()=>{
    try {
      const fetch = async () => {
        const res = await axios.get('http://localhost:3500/api/order/getAllOrders',
          {headers});

          // console.log(res.data.data)
          setAllOrders(res.data.data)
      }
      fetch()
    } catch (error) {
      console.log(error)
      alert(error.response.data.message)
    }
  },[AllOrders])

  //todo:  
  const setOptionsButton = (i)=>{
    setOptions(i)
  }

  //todo 
  const handlerSubmit = async(i)=>{
   try {
    const id = AllOrders[i]._id;
    const res = await axios.put(
      `http://localhost:3500/api/order/updateOrderStatus/${id}`,
      StatusValue,
      {headers}
    )
    alert(res.data.message)
   } catch (error) {
    console.log(error)
   }
  } 

  return (
    <div>
      {!AllOrders && (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      )}
      {AllOrders && AllOrders.length > 0 && (
        <section className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            All Orders
          </h1>
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <h1>Sr.</h1>
            </div>
            <div className="w-[40%] md:w-[22%]">
              <h1>Books</h1>
            </div>
            <div className="w-0 md:w-[45%] hidden md:block">
              <h1>Description</h1>
            </div>
            <div className="w-[17%] md:w-[9%]">
              <h1>Price</h1>
            </div>
            <div className="w-[30%] md:w-[16%]">
              <h1>Status</h1>
            </div>
            <div className="w-[10%] md:w-[5%] ">
              <h1>
                <FaUserLarge />
              </h1>
            </div>
          </div>
          {AllOrders &&
            AllOrders.map((item, i) => (
              <div key={i} className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer">
                <div className="w-[3%]">
                  <h1 className="text-center">{i + 1}</h1>
                </div>
                <div className="w-[40%] md:w-[22%]">
                  <Link
                    to={`/bookDetails/${item.book._id}`}
                    className="hover:text-blue-300"
                  >
                    {item.book.title}
                  </Link>
                </div>
                <div className="w-0 md:w-[45%] hidden md:block">
                  <h1>{item.book.description.slice(0, 50)} . . .</h1>
                </div>
                <div className="w-[17%] md:w-[9%]">
                  <h1>₹ {item.book.price}</h1>
                </div>
                <div className="w-[30%] md:w-[16%]">
                  <h1 className='font-semibold'>
                    <button onClick={()=>setOptionsButton(i)}
                      className='hover:scale-105 transition-all duration-300'>
                      {item.status === "Order placed" ? (
                        <div className='text-yellow-500'>{item.status}</div>
                      ): item.status === "Canceled"?(
                        <div className='text-red-500'>{item.status}</div>
                      ): item.status === 'Out for delivery'?(
                        <div className='text-cyan-500'>{item.status}</div>
                      ):(
                        <div className='text-green-500'>{item.status}</div>
                      )}
                    </button>
                    <div className={`${Options === i ? 'block': "hidden"}  flex gap-2`}>
                      <select 
                        onChange={handlerChange}
                        name="status" 
                        value={StatusValue.status}
                        id="" className='bg-gray-800'>
                        {[
                          "Order placed",
                          "Out for delivery",
                          "Delivered",
                          "Canceled"
                        ].map((statuses , i)=>(
                          <option value={statuses} key={i}>{statuses}</option>
                        ))}
                      </select>
                      <button 
                        onClick={()=>{
                          setOptions(-1)
                          handlerSubmit(i)
                        }}
                        className='text-green-500 hover:text-pink-600 mx-2'>
                        <FaCheckCircle />
                      </button>
                    </div>
                  </h1>
                </div>
                <div className="w-[10%] md:w-[5%]">
                  <button
                    onClick={()=>{
                      setUserDiv('fixed')
                      setUserDivData(item.user)
                    }}
                    title='user' 
                    className="text-xl hover:text-orange-500 text-zinc-100">
                    <FaExternalLinkSquareAlt />
                  </button>
                </div>
              </div>
            ))}
        </section>
      )}

      {userDivData && (
        <SeeUser
            userDiv={userDiv}
            setUserDiv={setUserDiv}
            userDivData={userDivData}
        />
      )}
    </div>
  );
}

export default AllOrders