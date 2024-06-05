import React from "react";

export default function Facebook() {
  //Function to handle image click
  const handleImageClick = () => {
    // Trigger Facebook sharing dialog
    window.FB.ui(
      {
        display: "popup",
        method: "share",
        href: "http://127.0.0.1:5173/",
      },
      function () {}
    );
  };
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => handleImageClick()}
      >
        FaceBook
      </button>
    </div>
  );
}
