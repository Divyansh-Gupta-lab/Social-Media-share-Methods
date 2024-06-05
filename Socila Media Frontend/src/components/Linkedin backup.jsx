import React from "react";

export default function Linkedin() {
  const handleLinkedinClick = () => {
    // Trigger Facebook sharing dialog
    window.open(
      "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77bmwpgby1b36b&redirect_uri=http://localhost:5173/linkedin&state=foobar&scope=profile%20email%20w_member_social%20openid"
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
