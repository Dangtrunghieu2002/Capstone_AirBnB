import React, { useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";

const AdminModal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames="overlay"
        unmountOnExit
      >
        <div className="overlay" aria-hidden="true" />
      </CSSTransition>
      <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
        <div ref={modalRef} className="modal">
          <div className="p-7">
            <button
              onClick={onClose}
              className="hover:opacity-70 duration-100 ease-in-out text-lg py-2 px-6 rounded-md text-white bg-black"
            >
              Close
            </button>
            {/* Dynamic Content */}
            <div className="mt-5">{children}</div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default AdminModal;
