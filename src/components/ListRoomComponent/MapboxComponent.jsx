import React from "react";

const MapboxComponent = () => {

  return (
    <div className="h-screen">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d26366.92686312526!2d106.66877353264934!3d10.775489832278177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1726920424336!5m2!1svi!2s"
        width={660}
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default MapboxComponent;
