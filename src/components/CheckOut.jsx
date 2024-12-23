import React, { useContext, useState } from "react";
import Modal from "./UI/Modal";
import { CartContext } from "../store/CartContext";
import Input from "./UI/Input";
import Button from "./UI/Button";
import { UserProgressContext } from "../store/UserProgressContext";

function CheckOut() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    function handleClose() {
        userProgressCtx.hideCheckOut();
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        if (!customerData.name || !customerData.email || !customerData.street || !customerData["postal-code"] || !customerData.city) {
            setSubmissionMessage("Please fill in all required fields.");
            setIsSuccess(false);
            setTimeout(() => {
                setSubmissionMessage("");
            }, 3000);
            return;
        }

        setIsSubmitting(true);
        setSubmissionMessage("");

        try {
            const response = await fetch("http://localhost:3000/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    order: {
                        items: cartCtx.items,
                        customer: customerData,
                    },
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to submit order");
            }

            const data = await response.json();
            setSubmissionMessage("Order submitted successfully!");
            setIsSuccess(true);
            cartCtx.clearCart();
            handleClose();

            setTimeout(() => {
                setIsSuccess(false);
                setSubmissionMessage("");
            }, 5000);

        } catch (error) {
            setSubmissionMessage("Failed to submit order. Please try again.");
            setIsSuccess(false);

            setTimeout(() => {
                setSubmissionMessage("");
            }, 3000);
        } finally {
            setIsSubmitting(false);
        }
    }

    const cartTotal = cartCtx.items?.reduce((totalPrice, item) => totalPrice + item.price * item.quantity, 0) || 0;

    return (
        <Modal open={userProgressCtx.progress === "checkout"}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: ₹ {cartTotal.toFixed(2)}</p>
                <Input label="Full Name" type="text" id="name" name="name" required />
                <Input label="E-mail" type="email" id="email" name="email" required />
                <Input label="Street" type="text" id="street" name="street" required />
                <div className="control-row">
                    <Input label="Post Code" type="text" id="postal-code" name="postal-code" required />
                    <Input label="City" type="text" id="city" name="city" required />
                </div>
                <div className="cart-item">
                    <Button type="button" textOnly onClick={handleClose}>Close</Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Order"}
                    </Button>
                </div>
                {submissionMessage && (
                    <p className={`submission-message ${isSuccess ? 'success' : 'error'}`}>
                        {submissionMessage}
                    </p>
                )}
            </form>
        </Modal>
    );
}

export default CheckOut;
