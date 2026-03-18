import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Categories from './components/Categories'

const App = () => {
  return (
    <div className='bg-[#F5F3EE] min-h-screen'>
      <Navbar />
      <Hero />
      <Categories />
    </div>
  )
}

export default App
