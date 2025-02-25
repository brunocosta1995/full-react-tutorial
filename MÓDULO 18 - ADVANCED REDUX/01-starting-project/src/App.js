import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import Notification from "./components/UI/Notification";
import { sentCart, fetchCartData } from "././store/cart-actions";

let isInitial = true;

function App() {
  const cartVisible = useSelector((state) => state.ui.cartVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchCartData());

  }, [dispatch])

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.cartChanged) {
      dispatch(sentCart(cart));
    }


    /* UPDATE BACKEND USING ASYNC OPS  INSIDE COMPONENTS
    const sendCart = async () => {
      dispatch(
        uiActions.showNotification({
          title: "Pending...",
          status: "pending",
          message: "The cart is been sended...",
        })
      );

      const response = await fetch(
        "https://react-course-2025-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("An error ocurred on sending the cart!");
      }

      dispatch(
        uiActions.showNotification({
          title: "Success!",
          status: "success",
          message: "Cart sent successfully!",
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCart().catch((error) => {
      dispatch(
        uiActions.showNotification({
          title: "Error!",
          status: "error",
          message: "Error on sending the cart!",
        })
      );
    });*/
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          title={notification.title}
          status={notification.status}
          message={notification.message}
        />
      )}
      <Layout>
        {cartVisible && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
