# 🎮 Slack Mini Games Bot

A simple Slack bot built with **Node.js** and **Slack Bolt** that provides fun mini-games and commands directly inside Slack.

## ✨ Features

* 🏓 Check bot latency
* 🐱 Get a random cat fact
* 😂 Get a random joke
* 🎲 Roll dice with customizable sides
* 🪙 Flip a coin
* ✊ Play Rock Paper Scissors
* 📖 View all available commands

## 🎮 Commands

| Command                    | Description                  |
| -------------------------- | ---------------------------- |
| `/mini-games-ping`         | Check the bot's latency      |
| `/mini-games-help`         | Show all available commands  |
| `/mini-games-catfact`      | Get a random cat fact        |
| `/mini-games-joke`         | Get a random joke            |
| `/mini-games-dice`         | Roll a standard 6-sided dice |
| `/mini-games-dice 20`      | Roll a 20-sided dice         |
| `/mini-games-coin`         | Flip a coin                  |
| `/mini-games-rps rock`     | Play Rock Paper Scissors     |
| `/mini-games-rps paper`    | Play Rock Paper Scissors     |
| `/mini-games-rps scissors` | Play Rock Paper Scissors     |

## 🛠️ Technologies

* **Node.js**
* **JavaScript**
* **Slack Bolt**
* **Socket Mode**
* **Axios**
* **dotenv**

----------------------
🎮 Mini Games Bot is running!
--------------------------------
```

## 🔧 Slack Setup

This project uses **Slack Socket Mode**, so you don't need to expose a public server or configure a Request URL.
Configure these commands in your Slack App:

```text
/mini-games-ping
/mini-games-help
/mini-games-catfact
/mini-games-joke
/mini-games-dice
/mini-games-coin
/mini-games-rps
```

## 🌐 APIs

Some commands use public APIs:

* **Cat Facts** — `catfact.ninja`
* **Jokes** — Official Joke API

The dice, coin flip, and Rock Paper Scissors games work locally using JavaScript's random number generation.

## 📁 Project Structure

```text
Mini-games/
│
├── index.js
├── package.json
├── package-lock.json
├── .gitignore
└── .env              # Local only — not committed
```

