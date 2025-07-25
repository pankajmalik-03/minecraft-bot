const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'PankajMalik03.aternos.me',
  port: 33329, 
  username: 'SACHIN_BOT',
});

bot.on('spawn', () => {
  console.log('Bot has spawned and is online!');
  bot.chat('Hello! I am SACHIN_BOT. Type "!help" for commands.');
});

// Chat message listener for commands
bot.on('chat', (username, message) => {
  try {
    if (username === bot.username) return; // Ignore bot's own messages
    
    console.log(`${username}: ${message}`);
    
    // Command handling
    if (message.startsWith('!')) {
    const command = message.slice(1).toLowerCase();
    
    switch (command) {
      case 'help':
        bot.chat('Commands: !time, !weather, !follow <player>, !stop, !jump, !dance, !health');
        break;
        
      case 'time':
        const time = bot.time.timeOfDay;
        const hours = Math.floor((time / 1000 + 6) % 24);
        const minutes = Math.floor((time % 1000) * 60 / 1000);
        bot.chat(`Current time: ${hours}:${minutes.toString().padStart(2, '0')}`);
        break;
        
      case 'weather':
        if (bot.isRaining) {
          bot.chat('It is currently raining!');
        } else {
          bot.chat('The weather is clear.');
        }
        break;
        
      case 'jump':
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 100);
        bot.chat('*jumps*');
        break;
        
      case 'dance':
        danceSequence();
        break;
        
      case 'health':
        bot.chat(`My health: ${bot.health}/20, Food: ${bot.food}/20`);
        break;
        
      case 'stop':
        bot.clearControlStates();
        followTarget = null;
        bot.chat('Stopped all actions.');
        break;
        
      default:
        if (command.startsWith('follow ')) {
          const playerName = command.split(' ')[1];
          const target = bot.players[playerName];
          if (target) {
            followTarget = playerName;
            bot.chat(`Now following ${playerName}!`);
          } else {
            bot.chat(`Player ${playerName} not found.`);
          }
        }
    }
  } catch (error) {
    console.log('Chat parsing error:', error.message);
    // Continue running despite chat errors
  }
});

// Follow functionality
let followTarget = null;

setInterval(() => {
  if (followTarget && bot.players[followTarget]) {
    const target = bot.players[followTarget].entity;
    if (target) {
      const distance = bot.entity.position.distanceTo(target.position);
      if (distance > 3) {
        bot.pathfinder.setGoal(new bot.pathfinder.goals.GoalFollow(target, 2));
      }
    }
  }
}, 1000);

// Dance function
function danceSequence() {
  bot.chat('*starts dancing*');
  let danceStep = 0;
  const danceInterval = setInterval(() => {
    if (danceStep % 2 === 0) {
      bot.look(bot.entity.yaw + Math.PI / 4, 0);
    } else {
      bot.look(bot.entity.yaw - Math.PI / 4, 0);
    }
    danceStep++;
    if (danceStep >= 8) {
      clearInterval(danceInterval);
      bot.chat('*finishes dancing*');
    }
  }, 500);
}

// Auto-eat when hungry
bot.on('health', () => {
  if (bot.food < 18) {
    const food = bot.inventory.items().find(item => 
      item.name.includes('bread') || 
      item.name.includes('apple') || 
      item.name.includes('beef') ||
      item.name.includes('pork')
    );
    
    if (food) {
      bot.equip(food, 'hand').then(() => {
        bot.consume();
        bot.chat('*nom nom* eating food!');
      });
    }
  }
});

bot.on('end', () => {
  console.log('Bot disconnected. Reconnecting...');
  followTarget = null;
  setTimeout(() => {
    try {
      bot.connect();
    } catch (error) {
      console.log('Reconnection failed:', error.message);
    }
  }, 5000); // Reconnect after 5 seconds
});

bot.on('error', (err) => {
  console.log('Bot error:', err.message);
  // Don't crash the entire process on bot errors
});

// Web server to keep the bot alive
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Bot is alive!'));
app.listen(3000, () => console.log('Web server running on port 3000'));