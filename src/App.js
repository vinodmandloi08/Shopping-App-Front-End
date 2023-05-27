import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Products from './components/Products';
import Cart from './components/Cart';

function App() {

  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])

  return (
      <BrowserRouter>
      <Navbar setCartOpen={setCartOpen} cartOpen={cartOpen}/>
      <Cart setCartOpen={setCartOpen} cartOpen={cartOpen} cartItems={cartItems} setCartItems={setCartItems}/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/products' element={<Products cartItems={cartItems} setCartItems={setCartItems}/>} />
      </Routes>
      </BrowserRouter>
  );
}

export default App;
