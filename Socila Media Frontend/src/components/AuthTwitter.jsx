import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function AuthTwitter() {
  const [authToken, setauthToken] = useState("");
  const [authVerifier, setauthVerifier] = useState("");
  const location = useLocation();

  useEffect(() => {
    // Function to extract code parameter from the URL
    const extractCodeFromUrl = () => {
      const searchParams = new URLSearchParams(location.search);
      const oauth_token = searchParams.get("oauth_token");
      const oauth_verifier = searchParams.get("oauth_verifier");
      setauthToken(oauth_token);
      setauthVerifier(oauth_verifier);

      // Do something with the extracted code
      console.log(oauth_token);
    };
    // Call the function when component mounts
    if (location.pathname == "/twitter") {
      extractCodeFromUrl();
    }
  }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          oauth_token: authToken,
          oauth_verifier: authVerifier,
          message: "Please Work!"
        };
        const response = await axios.get(
          "http://localhost:8443/twitter/tweet",
          {
            params: params,
          }
        );

        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (authToken != "") {
      fetchData();
    }
  }, [authToken]);
  return <div>AuthTwitter</div>;
}
