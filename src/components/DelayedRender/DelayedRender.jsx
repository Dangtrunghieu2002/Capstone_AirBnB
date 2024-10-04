import React, { useEffect, useState } from "react";
import { Skeleton } from "antd"; // Import Skeleton từ Ant Design

const DelayedRender = ({ children, delay }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, delay);

    return () => clearTimeout(timer); // Dọn dẹp timer
  }, [delay]);

  return show ? children : <Skeleton active />;
};

export default DelayedRender;