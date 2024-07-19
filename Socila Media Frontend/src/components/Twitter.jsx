import React from "react";
import axios from "axios";
import { useEffect } from "react";
import loadTwitterScript from "./twitterHelper";

export default function Twitter() {
  useEffect(() => {
    const bindTwitterEvents = async () => {
      try {
        const twttr = await loadTwitterScript();

        twttr.ready(() => {
          twttr.events.bind("tweet", (event) => {
            console.log("Tweet event occurred:", event);
            // Add your custom event handling logic here
            // For example, send a callback or confirmation to your server
          });
          twttr.events.bind("like", (event) => {
            console.log("Tweet like event occurred:", event);
            // Add your custom event handling logic here
            // For example, send a callback or confirmation to your server
          });
          twttr.events.bind("click", (event) => {
            console.log("Tweet click event occurred:", event);
            // Add your custom event handling logic here
            // For example, send a callback or confirmation to your server
          });
          twttr.events.bind("retweet", (event) => {
            console.log("Tweet retweet event occurred:", event);
            // Add your custom event handling logic here
            // For example, send a callback or confirmation to your server
          });
        });
      } catch (error) {
        console.error("Failed to load Twitter widgets script:", error);
      }
    };

    bindTwitterEvents();
  }, []);

  const handleTwitterClick = async () => {
    // Trigger Twitter verification window
    window.open(
      `https://twitter.com/intent/tweet?text=Twitter%20share%20example%20https%3A%2F%2Fwww.fiverr.com%2Fpe%2F96ep2x`,
      "_blank",
      "width=600,height=400"
    );
  };
  return (
    <div>
      {/* <button
        type="button"
        className="btn btn-primary"
        onClick={() => handleTwitterClick()}
      >
        Twitter
      </button> */}
      <blockquote className="twitter-tweet">
        <p lang="en" dir="ltr">
          iPhone 16 will be able to make phone calls{" "}
          <a href="https://t.co/NFP2oDdTEf">pic.twitter.com/NFP2oDdTEf</a>
        </p>
        &mdash; legit apple leaks (@leaks_legit){" "}
        <a href="https://twitter.com/leaks_legit/status/1805265132009717791?ref_src=twsrc%5Etfw">
          June 24, 2024
        </a>
      </blockquote>
      <a
        href="https://twitter.com/intent/tweet?button_hashtag=HYDROMeme&ref_src=twsrc%5Etfw"
        className="twitter-hashtag-button"
        data-show-count="false"
      >
        Tweet #HYDROMeme
      </a>
    </div>
  );
}
