import { useEffect, useState } from "react";
import MealItem from "./MealItem";
import useHttp from "../hook/useHttp";
import Error from "./Error.jsx";


export default function Meals() {
  const {
    data: loadedMeals,
    error,
    isLoading,
    sendRequest,
  } = useHttp("http://localhost:3000/meals");
  
  if (error) {
    return <Error title="Error on fething the meals" message={error}/>
  }

  if (isLoading) {
    return <p className="center">Loading the meals data...</p>;
  }


  if (loadedMeals && loadedMeals.length > 0) {
    return (
      <ul id="meals">
        {loadedMeals.map((meal) => (
          <MealItem key={meal.id} meal={meal} />
        ))}
      </ul>
    );
  }
}
