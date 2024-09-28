import React from "react";
import { useSelector } from "react-redux";
import useRoutesCustome from "./hooks/useRoutesCustome";
import { ToastContainer, toast, Bounce } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
export const NotificationContext = React.createContext();
function App() {
  const routes = useRoutesCustome();
  const showNotification = (content, type, duration = 4000) => {
    toast[type](content, {
      position: "top-right",
      autoClose: duration,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };
  return (
    <>
      <NotificationContext.Provider
        value={{
          showNotification,
        }}
      >
        <ToastContainer />
        {routes}
      </NotificationContext.Provider>
    </>
  );
}

export default App;
