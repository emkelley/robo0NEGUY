module.exports = {
  text: "!pong",
  callback: (channel, tags, message, self, client) => {
    setTimeout(() => {
      client.say(channel, "ping");
    }, 1000);
  },
};
