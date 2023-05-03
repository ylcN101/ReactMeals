import React, { useRef, useState } from 'react'
import Input from '../../UI/Input'
import classes from './MealItemForm.module.css'

const MealItemForm = (props) => {
  const amountInputRef = useRef()
  const [amountIsValid, setAmountIsValid] = useState(true)

  const submitHandler = (ev) => {
    ev.preventDefault()
    const enteredAmount = +amountInputRef.current.value
    if (enteredAmount < 1 || enteredAmount > 5) {
      setAmountIsValid(false)
      return
    }
    props.onAddToCart(enteredAmount)
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amout"
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>Add</button>
      {!amountIsValid && <p>Please enter a Valid Amount!</p>}
    </form>
  )
}

export default MealItemForm
