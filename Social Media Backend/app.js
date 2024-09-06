const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const qs = require("qs");
var cors = require("cors");
const OAuth = require("oauth-1.0a");
const crypto = require("crypto");
const otplib = require("otplib");

const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());
app.options("*", cors());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // This is important for handling cookies and other credentials
  })
);
app.use(express.json());
app.use(bodyParser.json());
const PORT = process.env.PORT || 8443;

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

app.get(`/telegram`, async (req, res) => {
  console.log("api hit");
  res.cookie("myCookie", "HelloWorld", { path: "/", httpOnly: true });
  res.send("Cookie set successfully");
});

// Define your Twitter API credentials
const credentials = {
  consumer_key: "nyfLjUWJmAFZHD9POnTt4hkKA",
  consumer_secret: "HQPfKo661rXTn0bAdeAe0c6Dt8oIpPaKXBL85cC9rgI4mNJ4FW",
  token: "1363067652135022597-seX6zjgVFkMYtbGXaJqwQKvUniJpRT",
  token_secret: "PjlLBVdo35uAcvCbpcuNtGIeFcoDSIHQoHAygsLRLIJeA",
};

// Create OAuth object
const oauth = OAuth({
  consumer: {
    key: credentials.consumer_key,
    secret: credentials.consumer_secret,
  },
  signature_method: "HMAC-SHA1",
  hash_function(base_string, key) {
    return crypto.createHmac("sha1", key).update(base_string).digest("base64");
  },
});

// Route to set a cookie (insecure)
app.get("/set-cookie", (req, res) => {
  const userData = { username: "test_user", token: "abc123" };

  // Set a cookie named 'user' with user data (no options for security)
  res.cookie("user", JSON.stringify(userData), { path: "/", httpOnly: true });

  res.send("Cookie set (insecurely)!");
});

app.get("/linkedin", async (req, res) => {
  try {
    const { code, message } = req.query;

    // Define the data to be sent in the request body
    const data = new URLSearchParams();
    data.append("grant_type", "authorization_code");
    data.append("code", code);
    data.append("client_id", "77bmwpgby1b36b");
    data.append("client_secret", "W2In79vAEwGfTJvk");
    data.append("redirect_uri", "http://localhost:5173/linkedin");
    const fetchData = async () => {
      try {
        //Get an access token
        const accessTokenResponse = await axios.post(
          "https://www.linkedin.com/oauth/v2/accessToken",
          data
        );

        console.log("Access token : " + accessTokenResponse.data.access_token);
        //Fetch user info
        const userId = await axios.get("https://api.linkedin.com/v2/userinfo", {
          headers: {
            Authorization: `Bearer ${accessTokenResponse.data.access_token}`,
          },
        });
        console.log("User ID : " + userId.data.sub);

        // Post on linkedin
        const postData = {
          author: `urn:li:person:${userId.data.sub}`,
          lifecycleState: "PUBLISHED",
          specificContent: {
            "com.linkedin.ugc.ShareContent": {
              shareCommentary: {
                text: message,
              },
              shareMediaCategory: "NONE",
            },
          },
          visibility: {
            "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
          },
        };

        const response = await axios.post(
          "https://api.linkedin.com/v2/ugcPosts",
          postData,
          {
            headers: {
              Authorization: `Bearer ${accessTokenResponse.data.access_token}`,
            },
          }
        );

        console.log(response.data);

        return response;
      } catch (error) {
        console.log(error);
      }
    };

    const responseData = await fetchData();
    // console.log(responseData);
    return res.json({ message: responseData.data });
  } catch (error) {
    return res.status(error.code || 500).json(error.message);
  }
});

app.post(
  `/api/telegram7178447161:AAF87KgQ4bZSxBzAiSB17a-f2XlkoXFH_IU`,
  async (req, res) => {
    const message = req.body.message || req.body.edited_message;
    console.log(message);
    res.json(message);
  }
);

app.get(`/otp`, async (req, res) => {
  const token = otplib.authenticator.generate(
    ""
  );
  console.log("Generated OTP token:", token);
  res.json(token);
});

app.post(`/`, async (req, res) => {
  res.json("hello");
});

// Create Express route handler
app.get("/twitter/requesttoken", async (req, res) => {
  try {
    // Set the request details
    const requestData = {
      url: "https://api.twitter.com/oauth/request_token",
      method: "POST",
    };

    // Generate OAuth1.0 signature
    const authorization = oauth.authorize(requestData, {
      key: credentials.token,
      secret: credentials.token_secret,
    });

    // Include OAuth1.0 signature in Authorization header
    const headers = oauth.toHeader(authorization);

    // Make the POST request to Twitter API
    const response = await axios.post(requestData.url, null, { headers });

    // Send the response from Twitter API back to the client
    res.json(response.data);
  } catch (error) {
    // Handle errors
    console.error(
      "Error:",
      error?.response ? error?.response.data : error.message
    );
    res.status(error?.response ? error?.response.status : 500).send("Error");
  }
});

// Tweet with the oauth token
app.get("/twitter/tweet", async (req, res) => {
  try {
    const { oauth_token, oauth_verifier, message } = req.query;
    const params = {
      oauth_token: oauth_token,
      oauth_verifier: oauth_verifier,
    };
    // Request user's access tokens
    const response = await axios.post(
      `https://api.twitter.com/oauth/access_token?oauth_verifier=${oauth_verifier}&oauth_token=${oauth_token}`
    );

    // Split the query string by "&"
    const queryParams = response.data.split("&");

    const values = {};
    await queryParams.forEach((item) => {
      const [key, value] = item.split("=");
      values[key] = value;
    });

    // Define variables to store oauth_token and oauth_token_secret
    let oauthToken = values.oauth_token;
    let oauthTokenSecret = values.oauth_token_secret;
    let user_id = values.user_id;

    console.log(oauthToken);
    console.log(oauthTokenSecret);
    console.log(user_id);

    // res.json("dadwadw");
    // Set the request details
    const requestData = {
      // url: `https://api.twitter.com/2/users/${user_id}/following`,
      url: `https://api.twitter.com/2/users/1363067652135022597/following`,

      method: "POST",
    };

    // Generate OAuth1.0 signature
    const authorization = await oauth.authorize(requestData, {
      key: oauthToken,
      secret: oauthTokenSecret,
    });

    // Include OAuth1.0 signature in Authorization header
    const headers = await oauth.toHeader(authorization);

    // Make the POST request to Twitter API
    // const response2 = await axios.post(requestData.url, null, { headers });
    const response2 = await axios({
      method: "post",
      url: requestData.url,
      headers: { headers },
      data: {
        target_user_id: "1778675632051781632", // This is the body part
      },
    });

    console.log(response2);
    // Send the response2 from Twitter API back to the client
    res.json(response2.data);
  } catch (error) {
    // Handle errors
    console.error(
      "Error:",
      error?.response ? error?.response.data : error.message
    );
    // console.log(error);
    res.status(error?.response ? error?.response.status : 500).send("Error");
  }
});

const twitterEndpoint = "https://api.twitter.com/2/tweets/search/recent";

// Define your Express route
app.get("/twitter/search", async (req, res) => {
  try {
    // Extract the Bearer token from the request parameters
    const bearerToken = req.query.bearer_token;
    const query = "#modi";
    console.log(bearerToken);

    // Make the request to the Twitter API
    const response = await axios.get(twitterEndpoint, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      params: {
        query: query, // Pass the query parameter here
      },
    });

    // Send the response from Twitter API to the client
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    console.error("Error fetching tweets:", error);
    res.status(500).json({ error: "Failed to fetch tweets from Twitter API" });
  }
});

// Add support for GET requests to Facebook webhook
app.get("/v1/api/instagramService/webhook", (req, res) => {
  // Parse the query params
  var mode = req.query["hub.mode"];
  var token = req.query["hub.verify_token"];
  var challenge = req.query["hub.challenge"];

  console.log("-------------- New Request GET --------------");
  // console.log("Headers:" + JSON.stringify(req.headers, null, 3));
  console.log("Body:" + JSON.stringify(req.body, null, 3));

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    if (mode === "subscribe" && token === "12345") {
      // Respond with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      console.log("Responding with 403 Forbidden");
      // Respond with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  } else {
    console.log("Replying Thank you.");
    res.json({ message: "Thank you for the message" });
  }
});

app.post("/v1/api/instagramService/webhook", function (req, res) {
  console.log("-------------- New Request POST --------------");
  console.log("Headers:" + JSON.stringify(req.headers, null, 3));
  console.log("Body:" + JSON.stringify(req.body, null, 3));
  res.json({ message: "Thank you for the message" });
});

app.post("/insta/login", (req, res) => {
  const data = {
    client_id: "3103819869753726",
    client_secret: "3ebf1b084786efc760b2316c0a2f8859",
    code: req.body.code,
    grant_type: "authorization_code",
    redirect_uri: "https://dev-geyser.hydro.online/",
  };

  // Format the data to x-www-form-urlencoded
  const formattedData = qs.stringify(data);

  // Set the headers
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie:
        "csrftoken=tr8fxghTAKH2ddFYHoAkQC; ig_did=06AC7D0A-D379-4CA1-A0E9-4B577A249704; ig_nrcb=1; mid=ZmrbHAAEAAF461Lt5Jgey3DdrNLZ",
    },
  };
  let accessToken;
  axios
    .post("https://api.instagram.com/oauth/access_token", formattedData, config)
    .then((response) => {
      console.log("Response:", response.data);
      accessToken = response.data.access_token;
      return;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  console.log(accessToken);
  return;
});

// app.post("/*", function (req, res) {
//   console.log("-------------- New Request POST --------------");
//   console.log("Headers:" + JSON.stringify(req.headers, null, 3));
//   console.log("Body:" + JSON.stringify(req.body, null, 3));
//   res.json({ message: "Thank you for the message" });
// });
