module.exports = {
  text: "!banme",
  callback: (channel, tags, message, self, client) => {
    const goodbye = `Goodbye, ${tags.username}, enjoy your ban :D`;
    client.ban(channel, tags.username);
    client.say(channel, goodbye);
  },
};
