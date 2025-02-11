import { useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";
import { createContext } from "react";

export const CartContext = createContext({
  items: [],
  updateItems: () => {},
  addItems: () => {},
});

function cartReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    const updatedItems = [...state.items];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === action.payload
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);
        updatedItems.push({
          id: action.payload,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return {
        items: updatedItems,
      };
  }
  if (action.type === 'UPDATE_ITEM') {
    const updatedItems = [...state.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === action.payload.productId
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += action.payload.amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
      };
  }


  return state;
}

export default function CartContextProvider({ children }) {

  const [cartState, cartDispatch] = useReducer(cartReducer, {
    items: []
  })


  function handleAddItemToCart(id) {
    cartDispatch({
      type: 'ADD_ITEM',
      payload: id
    })


  }

  function handleUpdateCartItemQuantity(productId, amount) {
    cartDispatch({
      type: 'UPDATE_ITEM',
      payload: {
        productId: productId,
        amount: amount
      }
    })
  }

  const ctxValue = {
    items: cartState.items,
    addItems: handleAddItemToCart,
    updateItems: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
