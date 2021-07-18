import React from 'react'
import './App.scss'
import Cart from './components/Cart'
import Gallery from './views/Gallery';

function App() {
  return (
    <div className="app-main_container">
      <Gallery />
      <Cart />
    </div>
  );
}

export default App
