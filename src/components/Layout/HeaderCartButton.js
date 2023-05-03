import React, { useContext, useEffect, useState } from 'react'
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'
import CartContext from '../../store/cart-context'

const HeaderCartButton = (props) => {
  const [btnToggle, setBtnToggle] = useState(false)
  const cartCtx = useContext(CartContext)
  const { items } = cartCtx

  const numOfCartItems = items.reduce((currNum, item) => {
    return currNum + item.amount
  }, 0)

  const btnClasses = `${classes.button} ${btnToggle ? classes.bump : ''}`

  useEffect(() => {
    if (items.length === 0) return
    setBtnToggle(true)

    const timer = setTimeout(() => {
      setBtnToggle(false)
    }, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [items])

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton
