import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function Modal({ children, open, className = "", onClose }) {
    const dialog = useRef();

    useEffect(() => {
        if (open) {
            dialog.current.showModal();
        } else {
            dialog.current.close();
        }
    }, [open]);

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    return createPortal(
        <dialog className={`modal ${className}`} ref={dialog} onClick={handleClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </dialog>,
        document.getElementById("modal")
    );
}

export default Modal;
