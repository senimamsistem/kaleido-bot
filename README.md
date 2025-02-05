# Kaleido Mining Bot

This is a mining bot for the Kaleido Finance Network. It helps in managing and tracking the mining progress for multiple wallets concurrently. The bot fetches data from the Kaleido Finance API, calculates earnings, and periodically updates the wallet's balance based on mining progress.

## Features

- **Mining Initialization**: Starts mining for each wallet by checking registration and activating mining.
- **Earnings Calculation**: Calculates earnings based on hashrate and time spent mining.
- **Balance Update**: Updates the wallet balance based on mined earnings.
- **Logging**: Logs mining status, total earnings, pending balance, and paid balance.
- **Multi-wallet Support**: Supports multiple wallets for parallel mining.
- **Graceful Shutdown**: Stops mining and updates the balance when stopped.

## Requirements

- Node.js v18 or higher
- `axios`, `chalk`, `ora` libraries for HTTP requests, colored output, and spinners.
- `wallets.json` file containing an array of wallet addresses.
- Create account [here](https://kaleidofinance.xyz/testnet?ref=YV2GG25Y)

## Installation

### Step 1: Clone the repository

```bash
git clone <repository_url>
cd kaleido-bot
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Configure wallets

Create a `wallets.json` file in the root directory with a list of wallet addresses to mine from:

```json
[
  "wallet_address_1",
  "wallet_address_2",
  "wallet_address_3"
]
```

### Step 4: Run the mining bot

To start the mining process:

```bash
npm start
```

This will start the bot and begin mining for each wallet listed in `wallets.json`.

## Usage

Once started, the bot will:

- Initialize each wallet.
- Begin mining and log the status periodically.
- Update the wallet balance based on earnings.
- Show total earnings, pending earnings, and paid earnings.

To stop the mining process:

1. Press `Ctrl + C` to stop the bot.
2. The bot will update the final balance and log the stop status.

## Scripts

### `start`

Start the mining bot:

```bash
npm start
```

## Code Explanation

### `KaleidoMiningBot`

This class represents a single mining bot for a wallet. It handles:

- Wallet initialization and registration check.
- Earnings calculation based on hashrate and time.
- Balance updates and logging.
- Starting and stopping the mining loop.

## Acknowledgments

- Kaleido Finance Network for providing the API and infrastructure.
- The creators of `axios`, `chalk`, and `ora` for their useful libraries.