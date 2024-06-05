import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function AuthLinkedin() {
  const [authToken, setauthToken] = useState("");
  const location = useLocation();

  useEffect(() => {
    // Function to extract code parameter from the URL
    const extractCodeFromUrl = () => {
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get("code");
      setauthToken(code);

      // Do something with the extracted code
      console.log("Code:", code);
    };
    // Call the function when component mounts
    if (location.pathname == "/linkedin") {
      extractCodeFromUrl();
    }
  }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          code: authToken,
          message: "Linkedin Test share post"
        };
        const response = await axios.get(
          "http://localhost:8443/linkedin",
          {
            params: params,
          }
        );

        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    if (authToken != "") {
      fetchData();
    }
  }, [authToken]);
  return <div>AuthLinkedin</div>;
}
