import React from "react";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { useState } from "react";

export default function Facebook() {
  //Function to handle image click
  const [user, setUser] = useState(null);

  const responseFacebook = (response) => {
    const payload = { token: response.accessToken };
    console.log("awdwa");
    setUser(payload);
    console.log(response);
  };

  const handleLoginFailure = (error) => {
    console.log(error);
  };

  const handleLogout = () => {
    FB.api("/122096195984337002/posts",
    {
      access_token: 'EAAVIZCZCjUupABO0FKqBBZBivQN2x7xMnWMMJwSxrAcXVRdhgJxX2UOVY8XAASp3ZAay3lvg4j2CRZBqCHXUsO8ZANZCo4m9LxbXE1N6I41XhTQSpKUZBMmCIGVqqf8Urt3ZAlRG9ZAqcumm5NbEyalraMymW2S2xCZBQj6Mw3xZCZAHKh5Q4SvrZAdWhjsD0g9NsvgyWHdvZA5wwSO2JcZCX85fLFgDNjXoPAZDZD'
    }, function (response) {
      if (response && !response.error) {
        console.log(response);
      }
    });
    setUser(null);
  };

  return (
    // <FacebookLogin
    //   appId={1487639112104592}
    //   autoLoad={true}
    //   fields="name, email, picture"
    //   scope="public_profile,email"
    //   callback={responseFacebook}
    //   render={(renderProps) => (
    //     <button onClick={renderProps.onClick}>
    //       This is my custom FB button
    //     </button>
    //   )}
    //   onFail={handleLoginFailure}
    // />
    <>
      <FacebookLogin
        autoLoad={false}
        appId={1487639112104592}
        scope="public_profile,email,instagram_basic,pages_show_list"
        onSuccess={(response) => {
          responseFacebook(response);
        }}
        onFail={(error) => {
          console.error("Login Failed!", error);
        }}
      />
      <button onClick={() => handleLogout()}>Click to test</button>
    </>
  );
}
