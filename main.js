require("dotenv").config();

const Discord = require("discord.js");
const got = require("got");

const client = new Discord.Client();

const GATEWAY_AUTH_HEADER = `Bearer ${process.env.GATEWAY_TOKEN}`;

const openGate = () =>
  got(
    "https://broloc.mozilla-iot.org/things/http---wemos_d1_mini.local-things-remote/properties/on",
    {
      method: "PUT",
      responseType: "json",
      headers: { Authorization: GATEWAY_AUTH_HEADER },
      json: { on: true }
    }
  );

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async msg => {
  if (msg.mentions.has(msg.guild.me, { ignoreEveryone: true })) {
    if (msg.content.includes("ping")) msg.reply("Pong!");

    if (["ouvre", "ouvrir", "open"].some(x => msg.content.includes(x))) {
      try {
        await openGate();
        msg.reply("Et voila !");
      } catch (error) {
        console.error(error);
        msg.reply("Heu... Pti probleme technique");
      }
    }
  }
});

client.login(process.env.BOT_TOKEN);
