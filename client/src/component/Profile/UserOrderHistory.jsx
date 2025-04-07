import axios from 'axios'
import React, { useEffect, useState } from 'react'

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
    <div>UserOrderHistory</div>
  )
}

export default UserOrderHistory