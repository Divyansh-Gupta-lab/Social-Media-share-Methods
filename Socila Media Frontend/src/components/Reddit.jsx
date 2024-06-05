import React from "react";
import axios from "axios";
import Snoowrap from "snoowrap";

export default function Reddit() {
  const config = {
    username: "div_atr1000",
    password: "D@Divyansh12#",
    clientId: 'fZW4nJ5lTYn5aPaBczx6qg',
    clientSecret: 'r1FINov7umSoJe4R8ZdCjoTtXffEmA',
  }
  const handleRedditClick = async () => {
    // Trigger Reddit verification window
    window.open(
      `http://www.reddit.com/submit?url=https://antiersolutions.com`,'_blank', 'width=600,height=400'
    );
  };

  function postLink() {
    const r = new Snoowrap({
      userAgent: 'Whatever',
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      username: config.username,
      password: config.password,
    })
    r.getSubreddit(subreddit).submitLink({
      title: "title1",
      url: "https://www.antiersolutions.com",
      sendReplies: true,
    })
  }

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => handleRedditClick()}
      >
        Reddit
      </button>
    </div>
  );
}
