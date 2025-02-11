import { createContext, useReducer } from "react";

export const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {}
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingItemIndex = state.items.findIndex(
      (item) => action.item.id === item.id
    );
    const updatedItems = [...state.items];
    const exitingItem = state.items[existingItemIndex];
    if (existingItemIndex > -1) {
      const updateItem = {
        ...exitingItem,
        quantity: exitingItem.quantity + 1,
      };
      updatedItems[existingItemIndex] = updateItem;
    } else {
      const addingItem = {
        ...action.item,
        quantity: 1,
      };
      updatedItems.push(addingItem);
    }
    return {
      ...state,
      items: updatedItems,
    };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const updatedItems = [...state.items];
    const existingItem = state.items[existingItemIndex];
    if (existingItemIndex > -1 && existingItem.quantity === 1) {
      updatedItems.splice(existingItemIndex, 1);
    } else {
      const removedItemQuantity = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      updatedItems[existingItemIndex] = removedItemQuantity;
    }
    return {
      ...state,
      items: updatedItems,
    };
  }

  if (action.type === "CLEAR_CART") {
    return {...state, items: []}
  }
  return state;
}

export default function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item: item }, cart);
  }

  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id }, cart);
  }

  function clearCart() {
    dispatchCartAction({type: "CLEAR_CART"})

  }

  const ctxCartValue = {
    items: cart.items,
    addItem: addItem,
    removeItem: removeItem,
    clearCart: clearCart
  };

  return (
    <CartContext.Provider value={ctxCartValue}>{children}</CartContext.Provider>
  );
}


