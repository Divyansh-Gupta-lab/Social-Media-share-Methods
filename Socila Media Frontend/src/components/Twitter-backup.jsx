import React from "react";
import axios from "axios";

export default function Twitter() {
  const handleTwitterClick = async () => {
    const response = await axios.get(
      "http://localhost:8443/twitter/requesttoken"
    );
    const tokenStartIndex =
      response.data.indexOf("oauth_token=") + "oauth_token=".length;
    const tokenEndIndex = response.data.indexOf("&", tokenStartIndex);
    const oauthToken = response.data.substring(tokenStartIndex, tokenEndIndex);

    // Trigger Twitter verification window
    window.open(
      `https://api.twitter.com/oauth/authenticate?oauth_token=${oauthToken}`
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
