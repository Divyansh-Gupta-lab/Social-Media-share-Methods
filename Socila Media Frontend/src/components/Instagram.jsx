import React from "react";
import { useRef, useEffect } from "react";
import { InstagramEmbed } from "react-social-media-embed";

export default function Instagram() {
  const instagramWrapperRef = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      const scriptElement = document.createElement("script");
      scriptElement.src =
        "https://instagram.com/static/bundles/es6/EmbedSDK.js/47c7ec92d91e.js";
      scriptElement.async = true;

      instagramWrapperRef.current.appendChild(scriptElement);
    }, 250);
  }, []);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <InstagramEmbed
        url="https://www.instagram.com/p/C8VHf4ryHSP/"
        width={400}
      />
      <div ref={instagramWrapperRef}></div>
    </div>
  );
}
