import React from 'react'
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

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route  path='/all-books' element={<AllBooks/>} />
          <Route  path='/login' element={<LogIn/>} />
          <Route  path='/signup' element={<SignUp/>} />
          <Route  path='/about' element={<AboutUs/>} />
          <Route  path='/cart' element={<Cart/>} />
          <Route  path='/profile' element={<Profile/>} />
          <Route  path='/bookDetails/:id' element={<BookDetails/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App