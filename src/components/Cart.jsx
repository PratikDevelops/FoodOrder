import React, { useContext } from "react";
import Modal from "./UI/Modal";
import { CartContext } from "../store/CartContext";
import { UserProgressContext } from "../store/UserProgressContext";
import Button from "./UI/Button";
import CartItem from "./CartItem";

function Cart() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
        return totalPrice + item.price * item.quantity;
    }, 0);

    function handleCloseCart() {
        userProgressCtx.hideCart();
    }

    function goToCheckOut(){
        userProgressCtx.showCheckOut();
    }

    return (
        <Modal className="cart" open={userProgressCtx.progress === "cart"}>
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.length > 0 ? (
                    cartCtx.items.map((item) => {
                        return (
                            <CartItem
                                key={item.id}
                                {...item}
                                onIncreae={() => cartCtx.addItem(item)}
                                onDecrease={() => cartCtx.removeItem(item.id)}
                            />
                        );
                    })
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </ul>
            <div className="cart-summary">
                <p className="cart-total">₹ {cartTotal.toFixed(2)}</p>
            </div>
            <div className="modal-actions">
                <Button onClick={handleCloseCart} textOnly>
                    Close
                </Button>
                {cartCtx.items.length > 0 && (
                    <Button onClick={goToCheckOut}>Go To Checkout</Button>
                )}
            </div>
        </Modal>
    );
}

export default Cart;
