const tmi = require("tmi.js")


var channelName = "Stream Bot Will Enter"

var prefix = "!"

var config = {
    options: {
        debug: true
    }, 
    connection: {
        cluster: "aws", 
        reconnect: true
    },
    identity: {
        username: "BotName",
        // get yours at http://twitchapps.com/tmi
        password: "Enter OuathCode Here from ^ "
    },
    channels: [channelName]
}

var client = new tmi.client(config)
client.connect();

client.on("connected", (address, port) => {
    client.action(channelName, "I am here to work for you!")})
client.on("disconnected", (reason) => {
    client.action(channelName, "Time ")
})
//------------------------------------------------------------------------------------



client.on("chat", (channel, user, message, self) => {
    if (self) return;
    if (message === ("Hi")){
        client.say(channel, "hey pal.")  }
if (message ==("KEKW")) {
         client.say(channel, "KEKW")
if (message == ("LUL"))
        client.say(channel, "LUL") }


let sender = user['display-name']
if(user['mod'] === false){
    if(message.includes("www.") || message.includes(".com")){
        client.timeout(channel, sender, 30, "Please refrain from posting links.")
         }
     }
        // cmd handler
        const args = message.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
        try {
            let commandFile = require(`./commands/${cmd}.js`)
            commandFile.run(client, message, args, user, channel, self) 
        } catch (err) {
            return;
        }
        

})


