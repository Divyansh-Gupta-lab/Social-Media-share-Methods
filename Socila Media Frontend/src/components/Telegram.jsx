import React, { useRef, useEffect } from "react";

export default function Telegram() {
  const telegramWrapperRef = useRef(null);

  useEffect(() => {
    const scriptElement = document.createElement("script");
    scriptElement.src = "https://telegram.org/js/telegram-widget.js?22";
    scriptElement.setAttribute("data-telegram-login", "HydroGeyserTestBot");
    scriptElement.setAttribute("data-size", "large");
    scriptElement.setAttribute("data-auth-url", "https://icx.peer.inc/");
    scriptElement.async = true;

    telegramWrapperRef.current.appendChild(scriptElement);
  }, []);

  return <div ref={telegramWrapperRef}></div>;
}
