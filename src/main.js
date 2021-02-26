require("dotenv").config();
const { QuickTwitchBot } = require("quick-chat-bot");
const path = require("path");

const twitchBot = new QuickTwitchBot({
  username: "robo0NEGUY",
  password: process.env.TWITCH_OAUTH,
  channel: "0neguy",
  commandsDir: path.join(__dirname, "commands"),
});

twitchBot.connect();
