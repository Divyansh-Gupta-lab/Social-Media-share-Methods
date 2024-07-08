import React from "react";

export default function instagramBusniessLogin() {
  return (
    <div>
      <button onClick={window.open('https://www.facebook.com/dialog/oauth?client_id=1854178161749963&display=page&extras={"setup":{"channel":"IG_API_ONBOARDING"}}&redirect_uri=https%3A%2F%2Fqa-geyser.hydro.online&response_type=token&scope=instagram_basic,instagram_content_publish,instagram_manage_comments,business_management')}>instagramBusniessLogin</button>
    </div>
  );
}
