import React, { useContext } from "react";
import { CartContext } from "../store/CartContext";
import { toast } from "react-toastify";
import Button from "./UI/Button";

function MealItem({ meal }) {
  const cartCtx = useContext(CartContext);

  const formattedPrice = meal.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });

  function handleMealAddToCart() {
    cartCtx.addItem(meal);
    toast.success(`${meal.name} added to cart!`, {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  }

  return (
    <li className="meal-item">
      <article>
        <img
          src={`http://localhost:3000/${meal.image}`}
          alt={meal.description}
        />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">{formattedPrice}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleMealAddToCart}>Add To Cart</Button>
        </p>
      </article>
    </li>
  );
}

export default MealItem;
