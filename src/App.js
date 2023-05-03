import React, { useState } from 'react'

import Header from './components/Layout/Header'
import Meals from './components/Meals/Meals'
import Cart from './components/Cart/Cart'
import CartProvider from './store/CartProvider'

function App() {
  const [cartIsShown, setCartIsShown] = useState(false)

  const toggleCartDisplay = () => {
    setCartIsShown((prevState) => !prevState)
  }

  return (
    <CartProvider>
      {cartIsShown && <Cart onHideCart={toggleCartDisplay} />}
      <Header onShowCart={toggleCartDisplay} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  )
}

export default App
