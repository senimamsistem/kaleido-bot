// banner.js
import chalk from 'chalk';

export function displayBanner() {
    console.log(chalk.cyan(`
    █████╗ ██████╗ ████████╗████████╗███████╗ █████╗ ███╗   ███╗
    ██╔══██╗██╔══██╗╚══██╔══╝╚══██╔══╝██╔════╝██╔══██╗████╗ ████║
    ███████║██████╔╝   ██║█████╗██║   █████╗  ███████║██╔████╔██║
    ██╔══██║██╔══██╗   ██║╚════╝██║   ██╔══╝  ██╔══██║██║╚██╔╝██║
    ██║  ██║██║  ██║   ██║      ██║   ███████╗██║  ██║██║ ╚═╝ ██║
    ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝      ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝  
                   ${chalk.yellow('BOT Farming')}                
     📢  ${chalk.blue('Discord: https://discord.gg/N3kPZS3625')}
    `));
}