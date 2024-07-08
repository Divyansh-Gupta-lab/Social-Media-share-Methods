import React, { useState, useEffect } from "react";

const FacebookLogin = () => {
  const [facebookAuth, setFacebookAuth] = useState();
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1854178161749963',
      cookie     : true,
      xfbml      : true,
      version    : 'v20.0'
    });
      
    FB.AppEvents.logPageView();   
      
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

  const handleLogin = () => {
    window.FB.login(
      function (response) {
        if (response.authResponse) {
          console.log(response);
          console.log("User logged in successfully:", response.authResponse);
          setFacebookAuth(response.authResponse.accessToken);
          // Handle successful login, e.g., fetch user data
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      {
        scope: "email, pages_manage_metadata", //,pages_manage_metadata,pages_manage_posts,pages_manage_read_engagement,pages_show_list,pages_read_engagement,pages_read_user_content",
      }
    );
  };

  useEffect(() => {
    console.log(facebookAuth);
  }, [facebookAuth]);

  // FB.getLoginStatus(function(response) {
  //   statusChangeCallback(response);
  // });

  return (
    <div>
      <button onClick={handleLogin}>Login with Facebook</button>
    </div>
  );
};

export default FacebookLogin;
