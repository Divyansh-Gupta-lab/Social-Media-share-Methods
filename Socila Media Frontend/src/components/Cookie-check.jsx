import React from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function Cookie() {
  const handleCookieCheck = async () => {
    const response = await axios.get(
      "http://localhost:8443/telegram", {
        withCredentials: true
      }
    );
    console.log(response);
  };
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => handleCookieCheck()}
      >
        Cookie check
      </button>
    </div>
  );
}
