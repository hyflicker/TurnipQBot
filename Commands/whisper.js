exports.run = (client, message, args, user, channel, self) => {
    client.whisper(channel, `@${user.username} Hi`)}
