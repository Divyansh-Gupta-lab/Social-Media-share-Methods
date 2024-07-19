import React from "react";
import { useEffect } from "react";

export default function RedditEmbed() {
  useEffect(() => {
    const scriptElement = document.createElement("script");
    scriptElement.src = "https://embed.reddit.com/widgets.js";
    scriptElement.async = true;
    document.body.appendChild(scriptElement);
  }, []);
  const embedUrl = `https://www.reddit.com/r/pcmasterrace/comments/1e67zic/finally_joined_after_months_of_working_towards_it/`;

  return (
    <blockquote class="reddit-embed-bq" data-embed-height="740">
      <a href="https://www.reddit.com/r/pcmasterrace/comments/1e6ylnz/and_just_like_that_the_world_is_down/"></a>
    </blockquote>
  );
}
