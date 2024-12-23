import { createContext, useReducer } from "react";

export const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

function CartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingCartIndex = state.items.findIndex((item) => item.id === action.item.id);
    const updatedItems = [...state.items];

    if (existingCartIndex > -1) {
      const existingItem = state.items[existingCartIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartIndex = state.items.findIndex((item) => item.id === action.id);
    if (existingCartIndex === -1) return state;

    const updatedItems = [...state.items];
    const existingCartItem = updatedItems[existingCartIndex];

    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }

  return state;
}

export default function CartContextProvider({ children }) {
  const [state, dispatch] = useReducer(CartReducer, { items: [] });

  const addItem = (item) => {
    dispatch({ type: "ADD_ITEM", item });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", id });
  };

  const value = {
    items: state.items,
    addItem,
    removeItem,
  };

  console.log("CartContext Value:", value);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
