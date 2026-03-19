import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Categories from './components/Categories'
import Restaurants from './components/Restaurants'

const App = () => {
  return (
    <div className='bg-[#F5F3EE] min-h-screen'>
      <Navbar />
      <Hero />
      <Categories />
      <Restaurants />
    </div>
  )
}

export default App
