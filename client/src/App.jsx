import React, { useEffect } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './component/Navbar/Navbar'
import Footer from './component/Footer/Footer'
import Home from './pages/Home'
import LogIn from './pages/Login'
import SignUp from './pages/SignUp'
import AllBooks from './pages/AllBooks'
import AboutUs from './pages/AboutUs'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import BookDetails from './component/BookDetails/BookDetails'
import { useDispatch,useSelector } from 'react-redux'
import { authActions } from './store/auth'
import Favorite from './component/Profile/Favorite'
import UserOrderHistory from './component/Profile/UserOrderHistory'
import Settings from './component/Profile/Settings'
import AllOrders from './component/Profile/AllOrders'
import AddBooks from './component/Profile/AddBooks'
import UpdateBook from './component/UpdateBook/UpdateBook'

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state)=> state.auth.role)

  useEffect(()=>{
    if(localStorage.getItem("id") &&
       localStorage.getItem("token") &&
       localStorage.getItem("role") 
    ){
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem('role')));
    }
  },[])

  return (<>
        <Navbar/>
    <div className='flex flex-col justify-between bg-zinc-900'>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route  path='/all-books' element={<AllBooks/>} />
          <Route  path='/login' element={<LogIn/>} />
          <Route  path='/signup' element={<SignUp/>} />
          <Route  path='/about' element={<AboutUs/>} />
          <Route  path='/cart' element={<Cart/>} />
          <Route  path='/profile' element={<Profile/>} >
            <Route index element={role === 'user'? <Favorite/> : role === 'admin' && <AllOrders/> } />
            <Route path='/profile/orderHistory' element={<UserOrderHistory/>} />
            <Route path='/profile/settings' element={<Settings/>} />
            <Route path='/profile/addBook' element={<AddBooks/>} />
          </Route>
          <Route  path='/bookDetails/:id' element={<BookDetails/>} />
          <Route  path='/updateBook/:id' element={<UpdateBook/>} />
        </Routes>
        <Footer/>
    </div>
    </>
  )
}

export default App