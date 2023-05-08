import React, { useEffect, useState } from 'react'
import Card from '../UI/Card'
import MealItem from './MealItem/MealItem'
import classes from './AvailableMeals.module.css'

const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://react-http-8b108-default-rtdb.europe-west1.firebasedatabase.app/meals.'
      )
      if (!response.ok) {
        throw new Error('ERROR!!')
      }
      const responseData = await response.json()

      const loadedMeals = []

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        })
      }
      setMeals(loadedMeals)
      setIsLoading(false)
    }

    fetchMeals().catch((error) => {
      setIsLoading(false)
      setError(error.message)
    })
  }, [])

  const loadingMsg = (
    <section>
      <p>Loading...</p>
    </section>
  )

  const errorMsg = (
    <section>
      <p>{error}</p>
    </section>
  )

  const mealList = meals.map((meal) => <MealItem {...meal} key={meal.id} />)

  return (
    <section className={classes.meals}>
      <Card>
        <div> {errorMsg}</div>
        <div> {isLoading ? loadingMsg : ''}</div>
        <ul>{mealList}</ul>
      </Card>
    </section>
  )
}

export default AvailableMeals
