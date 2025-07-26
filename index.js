const mineflayer = require("mineflayer");
const express = require("express");
const app = express();

// Web server for UptimeRobot pings
app.get("/", (req, res) => res.send("Bot is running."));
app.listen(3000, () => console.log("🌐 Web server running on port 3000"));

function createBot() {
  const bot = mineflayer.createBot({
    host: "PankajMalik03.aternos.me",
    port: 33329,
    username: "SACHINBOT", // Any name (offline/cracked)
    auth: "offline", // Cracked server, so no login
    version: false, // Auto-detect version
  });

  bot.once("spawn", () => {
    console.log("✅ Bot spawned in the world");

    // Basic movement loop
    setInterval(() => {
      bot.setControlState("forward", true);

      if (Math.random() < 0.2) {
        bot.setControlState("jump", true);
        setTimeout(() => bot.setControlState("jump", false), 500);
      }
    }, 1000);
  });

  bot.on("error", (err) => {
    console.error("❌ Bot error:", err.message);
  });
}

createBot();
