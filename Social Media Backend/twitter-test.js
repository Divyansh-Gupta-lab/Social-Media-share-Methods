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

const fetchData = async () => {
  try {
    const { data } = await userInfo("1792551102464036864");
    console.log(data, "this is the response");
  } catch (error) {
    console.log("Error:", error);
  }
};

// Call the async function
fetchData();
