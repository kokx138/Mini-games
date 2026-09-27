# Slack Mini Games Bot

A Slack bot built with Node.js and Slack Bolt that provides simple mini-games and utility commands directly inside Slack.
<img width="339" height="244" alt="image" src="https://github.com/user-attachments/assets/cf77e88c-b6d8-420a-b6d0-c9901fc6dab1" />

## Commands

<img width="582" height="267" alt="image" src="https://github.com/user-attachments/assets/ed69fb98-83e1-468f-b3d1-a68067191591" />

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

## Technologies

* Node.js
* JavaScript
* Slack Bolt
* Slack Socket Mode
* Axios
* dotenv
* Linux
* systemd

## Quick Start

Clone the repository and install the dependencies:

```bash
git clone https://github.com/kokx138/Mini-games.git
cd Mini-games
npm install
```

Create a `.env` file:

```env
SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_APP_TOKEN=xapp-your-app-token
```

Start the bot:

```bash
node index.js
```

## Environment Variables

The bot requires two environment variables:

```env
SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_APP_TOKEN=xapp-your-app-token
```

These are used to authenticate the Slack bot and connect to Slack using Socket Mode.

The `.env` file is ignored by Git and should never be committed to the repository.

## Slack Setup

Create a Slack App and enable Socket Mode.

Add the following slash commands to the Slack App:

```text
/mini-games-ping
/mini-games-help
/mini-games-catfact
/mini-games-joke
/mini-games-dice
/mini-games-coin
/mini-games-rps
```

Socket Mode allows the bot to receive Slack events without exposing a public HTTP server.

## How It Works

The bot uses Slack Bolt to register and handle slash commands.

Commands that require random results, such as dice, coin flips, and Rock Paper Scissors, are handled locally using JavaScript's random number generation.

The cat fact and joke commands make HTTP requests using Axios to public APIs and return the results to Slack.

The bot uses Slack's `respond()` function to send the result back to the channel or user that invoked the command.

## Local Development

Requirements:

* Node.js 20 or newer
* npm
* A Slack App with Socket Mode enabled

Install dependencies:

```bash
npm install
```

Create the `.env` file with your Slack credentials and start the bot:

```bash
node index.js
```

## Deployment

The bot is deployed to a Linux Nest server.

### 1. Install dependencies

On the server:

```bash
apt update
apt install -y git curl ca-certificates nano
curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
apt install -y nodejs
```

Check the installation:

```bash
node --version
npm --version
git --version
```

### 2. Clone the repository

```bash
cd /root
git clone https://github.com/kokx138/Mini-games.git
cd Mini-games
npm install
```

### 3. Configure environment variables

Create the `.env` file:

```bash
nano .env
```

Add the Slack credentials:

```env
SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_APP_TOKEN=xapp-your-app-token
```

Test the bot:

```bash
node index.js
```


### 4. Create the systemd service

Create:

```bash
nano /etc/systemd/system/slackbot.service
```

Add:

```ini
[Unit]
Description=Slack Mini Games Bot
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=root
Restart=always
RestartSec=5
WorkingDirectory=/root/Mini-games
ExecStart=/usr/bin/node index.js

[Install]
WantedBy=multi-user.target
```

### 5. Enable and start the service

```bash
systemctl daemon-reload
systemctl enable --now slackbot.service
```

Check the status:

```bash
systemctl status slackbot.service
```

The service should show:

```text
Active: active (running)
```

View the bot logs:

```bash
journalctl -u slackbot.service -f
```

## Credits

Built with:

* Slack Bolt
* Axios
* dotenv
* Cat Facts API
* Official Joke API

