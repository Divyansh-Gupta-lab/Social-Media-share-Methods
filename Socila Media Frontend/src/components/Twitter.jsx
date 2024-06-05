import React from "react";
import axios from "axios";

export default function Twitter() {
  const handleTwitterClick = async () => {
    // Trigger Twitter verification window
    window.open(
      `https://twitter.com/intent/tweet?text=Twitter%20share%20example%20https%3A%2F%2Fwww.fiverr.com%2Fpe%2F96ep2x`,'_blank', 'width=600,height=400'
    );
  };
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => handleTwitterClick()}
      >
        Twitter
      </button>
    </div>
  );
}

{/* <a href="https://twitter.com/XDevelopers?ref_src=twsrc%5Etfw" class="twitter-follow-button" data-show-count="false">Follow @XDevelopers</a> */}