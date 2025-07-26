const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Bot is running.'));
app.listen(3000, () => console.log('🌐 Web server running on port 3000'));

function createBot() {
  const bot = mineflayer.createBot({
    host: 'PankajMalik03.aternos.me',
    port: 33329,
    username: 'SACHINBOT', // Can be anything since auth is offline
    auth: 'offline', // Cracked server = NO login required
    version: false // Let it auto-detect version
  });

  // Keep moving forward + random jump
  bot.once('spawn', () => {
    console.log('✅ Bot spawned in the world');

    setInterval(() => {
      bot.setControlState('forward', true);

      if (Math.random() < 0.2) {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 500);
      }
    }, 1000);
  });

  bot.on('error', err => {
    console.error('❌ Bot error:', err);
  });

  bot.on('end', () => {
    console.log('🔄 Bot disconnected. Reconnecting in 5s...');
    setTimeout(createBot, 5000);
  });

  bot.on('kicked', reason => {
    console.log('⛔ Bot was kicked:', reason);
  });
}

createBot();
