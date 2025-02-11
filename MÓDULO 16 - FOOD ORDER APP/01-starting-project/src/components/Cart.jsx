import Modal from "./UI/Modal.jsx";
import { CartContext } from "../store/CartContext";
import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button.jsx";
import { ProgressCtx } from "../store/UserProgressContext.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart() {
  const { items, addItem, removeItem } = useContext(CartContext);
  const ctxUserProgress = useContext(ProgressCtx);

  const cartTotal = items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0
  );

  function handleCloseCart() {
    const { hideCart } = ctxUserProgress;
    hideCart();
  }

  function handleOpenCheckout() {
    const { showCheckout } = ctxUserProgress;
    showCheckout();
  }

  return (
    <Modal
      className="cart"
      open={ctxUserProgress.progress === "cart"}
      onClose={ctxUserProgress.progress === "cart" ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => {
          return (
            <CartItem
              key={item.id}
              onDecrease={() => removeItem(item.id)}
              onIncrease={() => addItem(item)}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
            />
          );
        })}
      </ul>
      <p className="cart-total">Total: {currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {items.length > 0 && (
          <Button onClick={handleOpenCheckout}>Go to checkout</Button>
        )}
      </p>
    </Modal>
  );
}
