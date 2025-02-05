// miner.js
import axios from 'axios';
import chalk from 'chalk';
import ora from 'ora';
import { readFile } from 'fs/promises';

class KaleidoMiningBot {
    constructor(wallet, botIndex) {
        this.wallet = wallet;
        this.botIndex = botIndex;
        this.currentEarnings = { total: 0, pending: 0, paid: 0 };
        this.miningState = { isActive: false, startTime: null };
        this.stats = { hashrate: 75.5, shares: { accepted: 0, rejected: 0 } };
        this.referralBonus = 0;
        this.api = axios.create({
            baseURL: 'https://kaleidofinance.xyz/api/testnet',
            headers: { 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0' }
        });
        this.spinner = ora({ text: `Initializing Wallet ${this.botIndex}...`, spinner: 'dots' });
    }

    async initialize() {
        try {
            console.log(`⛏️ Starting miner for Wallet ${this.botIndex}: ${this.wallet}`);
            this.spinner.start();
            
            const regResponse = await this.api.get(`/check-registration?wallet=${this.wallet}`);
            if (!regResponse.data.isRegistered) throw new Error('Wallet not registered');
            
            this.referralBonus = regResponse.data.userData.referralBonus || 0;
            this.miningState.startTime = Date.now();
            this.miningState.isActive = true;
            this.spinner.succeed(`✅ Wallet ${this.botIndex} Mining Started!`);
            
            this.startMiningLoop();
        } catch (error) {
            this.spinner.fail(`❌ Wallet ${this.botIndex} Initialization Failed: ${error.message}`);
        }
    }    

    calculateEarnings() {
        const elapsedTime = (Date.now() - this.miningState.startTime) / 1000;
        return (this.stats.hashrate * elapsedTime * 0.0001) * (1 + this.referralBonus);
    }

    async updateBalance(finalUpdate = false) {
        try {
            const newEarnings = this.calculateEarnings();
            const payload = {
                wallet: this.wallet,
                earnings: {
                    total: this.currentEarnings.total + newEarnings,
                    pending: finalUpdate ? 0 : newEarnings,
                    paid: finalUpdate ? this.currentEarnings.paid + newEarnings : this.currentEarnings.paid
                }
            };
            
            const response = await this.api.post('/update-balance', payload);
            if (response.data.success) {
                this.currentEarnings.total = response.data.balance;
                this.logStatus(finalUpdate);
            }
        } catch (error) {
            console.error(chalk.red(`[Wallet ${this.botIndex}] Balance update failed: ${error.message}`));
        }
    }

    logStatus(final = false) {
        const uptime = ((Date.now() - this.miningState.startTime) / 1000).toFixed(0);
        const statusEmoji = final ? '🚨' : '✅';
        const statusText = final ? 'Final Status' : 'Mining Status';

        console.log(chalk.blue(`
 ${statusEmoji} [Wallet ${this.botIndex}] ${statusText} ${statusEmoji} 
 Wallet Address: ${this.wallet}
 Mining Uptime: ${uptime}s | Active: ${this.miningState.isActive}
 Hashrate: ${this.stats.hashrate.toFixed(2)} MH/s
 Total Earnings: ${chalk.cyan(this.currentEarnings.total.toFixed(8))} KLDO
 Pending Earnings: ${chalk.yellow(this.currentEarnings.pending.toFixed(8))} KLDO
 Paid Earnings: ${chalk.green(this.currentEarnings.paid.toFixed(8))} KLDO
 Referral Bonus: +${(this.referralBonus * 100).toFixed(1)}%
 -------------------------------------------------
        `));
    }
    

    async startMiningLoop() {
        while (this.miningState.isActive) {
            await this.updateBalance();
            await new Promise(resolve => setTimeout(resolve, 30000));
        }
    }

    async stop() {
        this.miningState.isActive = false;
        await this.updateBalance(true);
        console.log(chalk.red(`[Wallet ${this.botIndex}] Mining stopped.`));
    }
}

class MiningCoordinator {
    constructor() {
        this.bots = [];
    }

    async start() {
        console.log("Initializing Mining Bots...");
        const wallets = JSON.parse(await readFile('wallets.json', 'utf8'));
        console.log(`Found ${wallets.length} wallets`);

        this.bots = wallets.map((wallet, index) => new KaleidoMiningBot(wallet, index + 1));
        
        // Gunakan `Promise.all` agar semua wallet diproses bersamaan
        await Promise.all(this.bots.map(bot => bot.initialize()));
    }
}

export { MiningCoordinator, KaleidoMiningBot };
