import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-course-2025-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("An error ocurred on fetching the cart!");
      }

      const result = await response.json();

      return result;
    };

    try {
      const cartData = await fetchData();
      if (cartData.items) {
        dispatch(cartActions.replaceCart(cartData));
      }
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          title: "Error!",
          status: "error",
          message: "Error on sending the cart!",
        })
      );
    }
  };
};

export const sentCart = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        title: "Pending...",
        status: "pending",
        message: "The cart is been sended...",
      })
    );

    const updateCart = async () => {
      const response = await fetch(
        "https://react-course-2025-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items ? cart.items : [],
            totalQuantity: cart.totalQuantity,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("An error ocurred on sending the cart!");
      }
    };

    try {
      await updateCart();
      dispatch(
        uiActions.showNotification({
          title: "Success!",
          status: "success",
          message: "Cart sent successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          title: "Error!",
          status: "error",
          message: "Error on sending the cart!",
        })
      );
    }
  };
};
