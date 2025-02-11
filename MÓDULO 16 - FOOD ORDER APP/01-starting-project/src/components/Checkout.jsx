import { useContext, useActionState } from "react";
import Modal from "./UI/Modal";
import { CartContext } from "../store/CartContext";
import { currencyFormatter } from "../util/formatting.js";
import Input from "./Input.jsx";
import Button from "./UI/Button.jsx";
import { ProgressCtx } from "../store/UserProgressContext.jsx";
import useHttp from "../hook/useHttp.js";
import Error from "./Error.jsx";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const progressCtx = useContext(ProgressCtx);
  const {
    data,
    error,
    sendRequest,
    clearData
  } = useHttp("http://localhost:3000/orders", requestConfig);
  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0
  );
  const [formState, formAction, pending] = useActionState(checkoutAction, null)

  function handleCloseCheckout() {
    const { hideCheckout } = progressCtx;
    hideCheckout();
  }

  function handleFinishOrder() {
    const { clearCart } = cartCtx;
    clearData();
    clearCart();
    handleCloseCheckout();
  }

  async function checkoutAction(prevState, fd) {

    const data = Object.fromEntries(fd.entries());

    await sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: data,
        },
      })
    );
  }

  let actions = (
    <>
      <Button onClick={handleCloseCheckout} type="button" textOnly>
        close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (pending) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={progressCtx.progress === "checkout"}
        onClose={handleCloseCheckout}
      >
        <h2>Success</h2>
        <p>Your order was successfully sended!</p>
        <Button onClick={handleFinishOrder}>Close</Button>
      </Modal>
    );
  }

  return (
    <Modal
      open={progressCtx.progress === "checkout"}
      onClose={handleCloseCheckout}
    >
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total: {currencyFormatter.format(cartTotal)}</p>
        <Input id="name" label="Full Name" type="text" />
        <Input id="email" label="Email Address" type="email" />
        <Input id="street" label="Street" type="text" />
        <div className="control-row">
          <Input id="postal-code" label="Postal Code" type="text" />
          <Input id="city" label="City" type="text" />
        </div>
        {error && <Error title="Error on submiting order!" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
