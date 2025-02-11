import { currencyFormatter } from "../util/formatting";
import { CartContext } from "../store/CartContext";
import { useContext } from "react";

export default function CartItem({name, quantity, price, onDecrease, onIncrease}) {

  return (
    <li className="cart-item">
      <p>{name} - {quantity} X {currencyFormatter.format(price)}</p>
      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <span>{quantity}</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
}
