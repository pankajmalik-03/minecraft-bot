const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'PankajMalik03.aternos.me',
  port: 33329, 
  username: 'SACHIN_BOT',
});

bot.on('spawn', () => {
  console.log('Bot has spawned and is online!');
});

bot.on('end', () => {
  console.log('Bot disconnected. Reconnecting...');
  setTimeout(() => {
    bot.connect();
  }, 5000); // Reconnect after 5 seconds
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Bot is alive!'));
app.listen(3000, () => console.log('Web server running'));
});