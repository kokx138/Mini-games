require("dotenv").config();

const axios = require("axios");
const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

// ==========================================
// PING
// ==========================================

app.command("/mini-games-ping", async ({ ack, respond }) => {
  await ack();

  const start = Date.now();
  const latency = Date.now() - start;

  await respond({
    text: `🏓 Pong!\nLatency: ${latency}ms`
  });
});

// ==========================================
// HELP
// ==========================================

app.command("/mini-games-help", async ({ ack, respond }) => {
  await ack();

  await respond({
    text:
      `🎮 *Mini Games*\n\n` +
      `🏓 /mini-games-ping - Check bot latency\n` +
      `🐱 /mini-games-catfact - Get a cat fact\n` +
      `😂 /mini-games-joke - Get a joke\n` +
      `🎲 /mini-games-dice - Roll a dice\n` +
      `🎲 /mini-games-dice 20 - Roll a d20\n` +
      `🪙 /mini-games-coin - Flip a coin\n` +
      `✊ /mini-games-rps rock - Rock Paper Scissors`
  });
});

// ==========================================
// CAT FACT
// ==========================================

app.command("/mini-games-catfact", async ({ ack, respond }) => {
  // Acknowledge Slack immediately
  await ack();

  try {
    const response = await axios.get(
      "https://catfact.ninja/fact",
      {
        timeout: 5000
      }
    );

    await respond({
      text: `🐱 *Cat Fact:*\n${response.data.fact}`
    });

  } catch (error) {
    console.error("Cat fact error:", error.message);

    await respond({
      text: "❌ Failed to fetch a cat fact."
    });
  }
});

// ==========================================
// JOKE
// ==========================================

app.command("/mini-games-joke", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get(
      "https://official-joke-api.appspot.com/random_joke",
      {
        timeout: 5000
      }
    );

    await respond({
      text:
        `😂 *Joke:*\n\n` +
        `${response.data.setup}\n\n` +
        `*${response.data.punchline}*`
    });

  } catch (error) {
    console.error("Joke error:", error.message);

    await respond({
      text: "❌ Failed to fetch a joke."
    });
  }
});

// ==========================================
// DICE
// ==========================================

app.command("/mini-games-dice", async ({ command, ack, respond }) => {
  await ack();

  let sides = parseInt(command.text.trim());

  if (isNaN(sides)) {
    sides = 6;
  }

  if (sides < 2 || sides > 1000) {
    await respond({
      text: "❌ Please choose between 2 and 1000 sides."
    });

    return;
  }

  const roll = Math.floor(Math.random() * sides) + 1;

  await respond({
    text: `🎲 You rolled *${roll}* on a d${sides}!`
  });
});

// ==========================================
// COIN
// ==========================================

app.command("/mini-games-coin", async ({ ack, respond }) => {
  await ack();

  const result =
    Math.random() < 0.5
      ? "Heads 🪙"
      : "Tails 🪙";

  await respond({
    text: `🪙 *${result}!*`
  });
});

// ==========================================
// ROCK PAPER SCISSORS
// ==========================================

app.command("/mini-games-rps", async ({ command, ack, respond }) => {
  await ack();

  const playerChoice = command.text.trim().toLowerCase();

  const choices = [
    "rock",
    "paper",
    "scissors"
  ];

  if (!choices.includes(playerChoice)) {
    await respond({
      text:
        `✊ *Rock Paper Scissors*\n\n` +
        `Use:\n` +
        `/mini-games-rps rock\n` +
        `/mini-games-rps paper\n` +
        `/mini-games-rps scissors`
    });

    return;
  }

  const botChoice =
    choices[Math.floor(Math.random() * choices.length)];

  let result;

  if (playerChoice === botChoice) {
    result = "🤝 It's a draw!";
  } else if (
    (playerChoice === "rock" && botChoice === "scissors") ||
    (playerChoice === "paper" && botChoice === "rock") ||
    (playerChoice === "scissors" && botChoice === "paper")
  ) {
    result = "🎉 You win!";
  } else {
    result = "🤖 I win!";
  }

  await respond({
    text:
      `✊ *Rock Paper Scissors*\n\n` +
      `You: *${playerChoice}*\n` +
      `Bot: *${botChoice}*\n\n` +
      result
  });
});

// ==========================================
// START
// ==========================================

(async () => {
  try {
    await app.start();

    console.log("--------------------------------");
    console.log("🎮 Mini Games Bot is running!");
    console.log("--------------------------------");

  } catch (error) {
    console.error("❌ Bot failed to start:");
    console.error(error);
  }
})();