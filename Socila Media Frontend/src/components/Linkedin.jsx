import React from "react";

export default function Linkedin() {
  const handleLinkedinClick = () => {
    // Trigger Facebook sharing dialog
    window.open(
      "https://www.linkedin.com/sharing/share-offsite/?url=https://www.fiverr.com/pe/96ep2x",'_blank', 'width=600,height=400, left=200, top=200'
    );
  };
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => handleLinkedinClick()}
      >
        Linkedin
      </button>
    </div>
  );
}
