import { useState } from 'react'
import './App.css'

import ProductCard from "./components/ProductCard"
import CartItem from "./components/CartItem"
import Navbar from "./components/Navbar"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar cartCount={3} />

      <main>
        <h1>Calla Lily Sprint 2</h1>
        <br />
        <h2>This is a current ProductCard component.</h2>
        <ProductCard name="Calla Lily Premium Soap 1" price={120} />
        <ProductCard name="Calla Lily Premium Soap 2" price={120} />
        <ProductCard name="Calla Lily Premium Soap 3" price={120} />
        <br />
        <h2>This is a current CartItem component.</h2>
        <CartItem name="Calla Lily Premium Soap 1" price={120} />
        <CartItem name="Calla Lily Premium Soap 2" price={120} />
        <CartItem name="Calla Lily Premium Soap 3" price={120} />
      </main>
    </>
  )
}

export default App
