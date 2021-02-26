const { default: axios } = require("axios");
const ID = process.env.SPOTIFY_CLIENT_ID;
const SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const authBuffer = Buffer.from(`${ID}:${SECRET}`).toString("base64");

module.exports = {
  text: "!song",
  callback: (channel, tags, message, self, client) => {
    axios({
      method: "POST",
      url: "https://accounts.spotify.com/api/token",
      headers: { Authorization: `Basic ${authBuffer}` },
      params: {
        grant_type: "refresh_token",
        refresh_token: process.env.SPOTIFY_AUTH_REFRESH_TOKEN,
      },
    }).then(({ data: { access_token } }) => {
      axios({
        method: "GET",
        url: "https://api.spotify.com/v1/me/player/currently-playing?",
        headers: { Authorization: "Bearer " + access_token },
      }).then(({ statusText, data: { item } }) => {
        if (statusText === "No Content") {
          const notPlaying = "0NEGUY's Spotify is not currently playing music";
          client.say(channel, notPlaying);
        } else {
          console.log(Object.keys(item));
          const message = `🎵 ${item.name} by ${item.artists[0].name} 🎵 ${item.external_urls.spotify}`;
          client.say(channel, message);
        }
      });
    });
  },
};
