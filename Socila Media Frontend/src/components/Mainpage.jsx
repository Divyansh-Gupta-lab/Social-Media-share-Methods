import React from "react";
import { useRef, useEffect } from "react";
import Facebook from "./Facebook";
// import Telegram from "./Telegram";
import Linkedin from "./Linkedin";
import Twitter from "./Twitter";
import Reddit from "./Reddit-backup";
import Cookie from "./Cookie-check";
import Instagram from "./Instagram";

export default function Mainpage() {
  const telegramWrapperRef = useRef(null);

  const telegramFunction = () => {
    window.Telegram.Login.auth(
      {
        bot_id: "7178447161:AAF87KgQ4bZSxBzAiSB17a-f2XlkoXFH_IU",
        request_access: true,
      },
      (data) => {
        if (!data) {
          // authorization failed
          console.log("failed");
        }
        // Here you would want to validate data like described there https://core.telegram.org/widgets/login#checking-authorization
        console.log(data.id, "dadwadwadwa");
      }
    );
  };

  // useEffect(() => {
  //   const scriptElement = document.createElement("script");
  //   scriptElement.src = `https://telegram.org/js/telegram-widget.js?22`;
  //   scriptElement.setAttribute("data-telegram-login", "HydroGeyserTestBot");
  //   scriptElement.setAttribute("data-size", `medium`);
  //   scriptElement.setAttribute(
  //     "data-auth-url",
  //     "https://65bf-112-196-81-250.ngrok-free.app"
  //   );
  //   scriptElement.async = true;

  //   telegramWrapperRef.current.appendChild(scriptElement);
  // }, []);

  return (
    <div>
      <Instagram />
      <Facebook />
      {/* <Telegram /> */}
      <Linkedin />
      <Twitter />
      <Reddit />
      <Cookie />
      <div
        ref={telegramWrapperRef}
        className="telegram-login"
        id="telegram-login"
        // onClick={()=> window.open(
        //   "https://oauth.telegram.org/auth?bot_id=7178447161&origin=https%3A%2F%2F65bf-112-196-81-250.ngrok-free.app&embed=1&return_to=https%3A%2F%2F65bf-112-196-81-250.ngrok-free.app"
        // )}
      ></div>

      {/* <button
        onClick={() =>
          window.open(
            "https://oauth.telegram.org/auth?bot_id=7178447161&origin=https%3A%2F%2F65bf-112-196-81-250.ngrok-free.app&embed=1&&request_access=write&return_to=https%3A%2F%2F65bf-112-196-81-250.ngrok-free.app"
            )
          }
        > */}
      <button onClick={() => telegramFunction()}>Custom Button</button>
      {/* <a href="https://twitter.com/DivyanshATR1000?ref_src=twsrc%5Etfw" class="twitter-follow-button" data-show-count="false">Follow @DivyanshATR1000</a> */}
      {/* <div
        className="fb-login-button"
        data-width=""
        data-size=""
        data-button-type=""
        data-layout=""
        data-auto-logout-link="false"
        data-use-continue-as="true"
      ></div> */}
    </div>
  );
}

// https://oauth.telegram.org/auth?bot_id=7178447161&originhttps%3A%2F%2F65bf-112-196-81-250.ngrok-free.app&embed=1&return_tohttps%3A%2F%2F65bf-112-196-81-250.ngrok-free.app
