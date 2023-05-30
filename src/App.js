import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Products from './components/Products';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './pages/dashboard/Dashboard'

function App() {

  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])

  return (
    <>
      <Navbar setCartOpen={setCartOpen} cartOpen={cartOpen} />
      <Cart setCartOpen={setCartOpen} cartOpen={cartOpen} cartItems={cartItems} setCartItems={setCartItems} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/products' element={<Products cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
