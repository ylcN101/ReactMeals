import React, { useReducer } from 'react'
import CartContext from './cart-context'

const defaultCartState = {
  items: [],
  totalAmount: 0,
}

const cartReducer = (state, action) => {
  if (action.type === 'ADD_ITEM') {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount
    const existingCartItemIdx = state.items.findIndex(
      (item) => item.id === action.item.id
    )
    const existingCartItem = state.items[existingCartItemIdx]
    let updatedItems

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      }
      updatedItems = [...state.items]
      updatedItems[existingCartItemIdx] = updatedItem
    } else {
      updatedItems = state.items.concat(action.item)
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    }
  }

  if (action.type === 'REMOVE_ITEM') {
    console.log('REMOVE_ITEM')
    const existingCartItemIdx = state.items.findIndex(
      (item) => item.id === action.id
    )
    const existingCartItem = state.items[existingCartItemIdx]
    const updatedTotalAmount = state.totalAmount - existingCartItem.price
    let updatedItems
    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id)
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      }
      updatedItems = [...state.items]
      updatedItems[existingCartItemIdx] = updatedItem
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    }
  }

  if (action.type === 'CLEAR') {
    return defaultCartState
  }

  return defaultCartState
}

const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState)

  const addItemFromCartHandler = (item) => {
    dispatchCart({ type: 'ADD_ITEM', item: item })
    console.log('item:', item)
  }
  const removeItemFromCartHandler = (id) => {
    dispatchCart({ type: 'REMOVE_ITEM', id: id })
    console.log('id:', id)
  }

  const clearCartHandler = () => {
    dispatchCart({ type: 'CLEAR' })
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemFromCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  }

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider
