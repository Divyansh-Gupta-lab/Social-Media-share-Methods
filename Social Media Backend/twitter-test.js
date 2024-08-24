const axios = require("axios");

const userInfo = async (userId) => {
  try {
    // to be extracted from a stored place after the user login process is complete during follow twitter
    const bearerToken =
      "AAAAAAAAAAAAAAAAAAAAAD7MMwEAAAAACpErGlI8jpFE8YCCQONUzHMyho0%3DjCeV7dWutvc8vGdy3eu8YEfIfUsAD8HcQpe4ipd9MNzfubml5a";
    const headers = { Authorization: `Bearer ${bearerToken}` };
    const requestRecentTweetsUrl = `https://api.twitter.com/2/users/${userId}?user.fields=created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld`;
    const userInfoResponse = await axios.get(requestRecentTweetsUrl, {
      headers: headers,
    });

    return {
      data: userInfoResponse?.data?.data || "",
    };
  } catch (error) {
    console.log("error", error);
  }
};


const tweetComments = async (
  conversationId,
  next_token = "",
  maxCount = 99
  ) => {
    try {
      // to be extracted from a stored place after the user login process is complete during follow twitter
      const bearerToken =
      "AAAAAAAAAAAAAAAAAAAAAD7MMwEAAAAACpErGlI8jpFE8YCCQONUzHMyho0%3DjCeV7dWutvc8vGdy3eu8YEfIfUsAD8HcQpe4ipd9MNzfubml5a";
      const headers = { Authorization: `Bearer ${bearerToken}` };
      const requestRecentTweetsUrl =
      next_token.length > 0
      ? `https://api.twitter.com/2/tweets/search/recent?tweet.fields=in_reply_to_user_id&expansions=author_id&user.fields=username,id&max_results=${maxCount}&next_token=${next_token}&query=conversation_id:${conversationId}`
      : `https://api.twitter.com/2/tweets/search/recent?tweet.fields=in_reply_to_user_id&expansions=author_id&user.fields=username,id&max_results=${maxCount}&query=conversation_id:${conversationId}`;
      const tweetCommentsResponse = await axios.get(requestRecentTweetsUrl, {
        headers: headers,
      });
      
      // Create a map for quick lookup of user details by id
      const userMap = new Map();
    tweetCommentsResponse.data.includes.users.forEach((user) => {
      userMap.set(user.id, { username: user.username, name: user.name });
    });
    
    // Create the new data object
    const newData = tweetCommentsResponse.data.data.map((tweet) => {
      const userDetails = userMap.get(tweet.author_id);
      if (userDetails) {
        return {
          ...tweet,
          username: userDetails.username,
          name: userDetails.name,
        };
      }
      return tweet;
    });
    
    // Resulting object
    const result = {
      ...tweetCommentsResponse.data,
      data: newData,
    };
    
    return {
      data: result?.data || "",
      nextPaginationToken: tweetCommentsResponse?.data?.meta?.next_token || "",
    };
  } catch (error) {
    console.log("error", error);
  }
};

const fetchData = async () => {
  try {
    const { data } = await userInfo("1792551102464036864");
    const { data: tweetCommentresponse } = await tweetComments(
      "1800151148378107929",
    );
    console.log(tweetCommentresponse, "tweet comments response")
    console.log(data, "this is the response");
  } catch (error) {
    console.log("Error:", error);
  }
};
// Call the async function
fetchData();
