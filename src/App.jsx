// import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Properties from './pages/properties';
import Property from './pages/property';
import Footer from './components/footer';
import Navbar from './components/navbar';

const App = () => {
  return (
      <BrowserRouter>

        <Navbar/>

          <Routes>
            <Route path='/' element={<Properties/>}/>
            <Route path='/property/:id' element={<Property/>}/>
          </Routes>

        <Footer/>
        
      </BrowserRouter>
  )
}

export default App