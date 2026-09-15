const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const path = require('path');
require('dotenv').config();

// --- Servidor HTTP ---
const app = express();
const PORT = process.env.PORT || 3000;
const startTime = Date.now();

// Servir archivos estáticos de /public (incluye index.html y style.css)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint con datos en vivo
app.get('/status', (req, res) => {
  const uptimeMs = Date.now() - startTime;
  const horas = Math.floor(uptimeMs / 3600000);
  const minutos = Math.floor((uptimeMs % 3600000) / 60000);

  res.json({
    status: client.isReady() ? 'online' : 'offline',
    tag: client.user?.tag || 'desconocido',
    ping: client.ws.ping,
    uptime: `${horas}h ${minutos}m`,
    guilds: client.guilds.cache.size,
  });
});

app.listen(PORT, () => {
  console.log(`Servidor HTTP escuchando en puerto ${PORT}`);
});

// --- Bot de Discord ---
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on('clientReady', () => {
  console.log(`Bot conectado como ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
  if (message.content === '!ping') {
    message.reply('Pong! 🏓');
  }
});

client.login(process.env.DISCORD_TOKEN);