const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Bot is alive, darling 💖'));
app.listen(3000, () => console.log('✨ Web server running on port 3000'));

function createBot() {
  const bot = mineflayer.createBot({
    host: 'PankajMalik03.aternos.me', // your Aternos server address
    port: 33329, // your custom port
    username: 'SachinBot', // any cracked name you like
    auth: 'offline' // cracked mode, no Microsoft login
  });

  bot.once('spawn', () => {
    console.log('🟢 Bot spawned and ready!');
    bot.chat('Hey hey 👀 I’m online and lookin’ fine~');

    // Prevent AFK kick by jumping every 10 seconds
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 10000);

    // Periodically break blocks under it like a rebel 😈
    setInterval(() => {
      const block = bot.blockAt(bot.entity.position.offset(0, -1, 0));
      if (block && bot.canDigBlock(block)) {
        bot.dig(block).catch(err => {
          console.log('🧱 Digging error:', err.message);
        });
      }
    }, 15000);
  });

  // Respond to chat (but never leave)
  bot.on('chat', (username, message) => {
    if (username === bot.username) return;

    console.log(`${username}: ${message}`);
    if (message.toLowerCase() === 'hello') {
      bot.chat(`Hi ${username}, what’s poppin’ boo? 😏`);
    } else if (message.toLowerCase().includes('come')) {
      const player = bot.players[username];
      if (player && player.entity) {
        bot.pathfinder.setGoal(new GoalNear(player.entity.position.x, player.entity.position.y, player.entity.position.z, 1));
        bot.chat(`Coming to you, sugarplum 💃`);
      }
    }
  });

  bot.on('end', () => {
    console.log('🔁 Bot disconnected. Reconnecting in 5s...');
    setTimeout(createBot, 5000);
  });

  bot.on('error', err => {
    console.error('❌ Bot error:', err.message);
  });
}

createBot();
