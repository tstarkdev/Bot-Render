const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
require('dotenv').config();

// --- Servidor HTTP para Render/UptimeRobot ---
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bot activo ✅');
});

app.listen(PORT, () => {
  console.log(`Servidor HTTP escuchando en puerto ${PORT}`);
});

// --- Tu bot de Discord ---
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on('ready', () => {
  console.log(`Bot conectado como ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
  if (message.content === '!ping') {
    message.reply('Pong! 🏓');
  }
});

client.login(process.env.DISCORD_TOKEN);