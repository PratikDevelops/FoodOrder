import { ToastContainer } from "react-toastify";
import logo from "./assets/logo.jpg";
import Cart from "./components/Cart";
import CheckOut from "./components/CheckOut";
import Header from "./components/Header";
import Meals from "./components/Meals";
import CartContextProvider from "./store/CartContext";
import { UserContextProvider } from "./store/UserProgressContext";

function App() {
  return (
    <>
      <UserContextProvider>
        <CartContextProvider>
          <ToastContainer />
          <Header />
          <Meals />
          <Cart />
          <CheckOut />
        </CartContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
