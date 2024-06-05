import React from "react";
import axios from "axios";

export default function Reddit() {
  const handleRedditClick = async () => {
    // Trigger Reddit verification window
    window.open(
      `http://www.reddit.com/submit?url=https://antiersolutions.com`,'_blank', 'width=600,height=400'
    );
  };
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => handleRedditClick()}
      >
        Reddit
      </button>
    </div>
  );
}
