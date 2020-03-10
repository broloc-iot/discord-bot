require("dotenv").config();

const Discord = require("discord.js");
const got = require("got");

const client = new Discord.Client();

const GATEWAY_AUTH_HEADER = `Bearer ${process.env.GATEWAY_TOKEN}`;

const openGate = () =>
  got(`${process.env.GATEWAY_URL}${process.env.GATE_PROPERTY_ON_URI}`, {
    method: "PUT",
    responseType: "json",
    headers: { Authorization: GATEWAY_AUTH_HEADER },
    json: { on: true }
  });

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async msg => {
  if (msg.guild && msg.mentions.has(msg.guild.me, { ignoreEveryone: true })) {
    if (msg.content.includes("ping")) msg.reply("Pong!");

    if (["ouvre", "ouvrir", "open"].some(x => msg.content.includes(x))) {
      console.log(new Date().toISOString(), "Gate opening");
      try {
        await openGate();
        console.log(new Date().toISOString(), "Gate opened");
        msg.reply("Et voila !");
      } catch (error) {
        console.log(new Date().toISOString(), "Gate failed to open");
        console.error(error);
        msg.reply("Heu... Pti probleme technique");
      }
    }
  }
});

client.login(process.env.BOT_TOKEN);
