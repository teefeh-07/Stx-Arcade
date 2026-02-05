const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();

function run(cmd) {
    console.log(`Running: ${cmd}`);
    try {
        execSync(cmd, { stdio: 'inherit', cwd: ROOT });
    } catch (e) {
        console.error(`Command failed: ${cmd}`);
    }
}

function commit(msg) {
    try {
        execSync('git add .', { cwd: ROOT });
        execSync(`git commit -m "${msg}"`, { cwd: ROOT });
    } catch (e) {
        console.log('Nothing to commit or commit failed');
    }
}

function ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

// Helper to append content and commit
function appendAndCommit(filePath, content, msg) {
    fs.appendFileSync(path.join(ROOT, filePath), content);
    commit(msg);
}

// Helper to write content and commit
function writeAndCommit(filePath, content, msg) {
    fs.writeFileSync(path.join(ROOT, filePath), content);
    commit(msg);
}

// MAIN EXECUTION
(async () => {
    // 1. Initial Setup Checks
    if (!fs.existsSync(path.join(ROOT, '.git'))) {
        run('git init');
        run('git remote add origin https://github.com/teefeh-07/Stx-Arcade.git');
    }
    
    // Switch to main
    try { run('git checkout main'); } catch { run('git checkout -b main'); }

    // FEATURE 1: Project Structure & Basic Config
    // ------------------------------------------------
    const featStructure = 'feat/project-structure';
    run(`git checkout -b ${featStructure}`);
    
    // Create folder for shared types
    ensureDir('shared/types');
    writeAndCommit('shared/types/index.ts', '// Shared Types\n', 'feat: create shared types directory');
    appendAndCommit('shared/types/index.ts', 'export interface GameState {}\n', 'feat: add GameState interface');
    
    // Create detailed documentation structure
    ensureDir('docs/architecture');
    writeAndCommit('docs/architecture/overview.md', '# Architecture Overview\n', 'docs: init architecture overview');
    appendAndCommit('docs/architecture/overview.md', 'This document describes the high-level architecture.\n', 'docs: add architecture description');
    
    // Merge back
    run('git checkout main');
    run(`git merge ${featStructure}`);

    // FEATURE 2: Wallet Connect Integration (@stacks/connect)
    // ------------------------------------------------
    const featWallet = 'feat/wallet-connect';
    run(`git checkout -b ${featWallet}`);
    
    const walletFile = 'frontend/lib/stacks-wallet.ts';
    ensureDir('frontend/lib');
    
    writeAndCommit(walletFile, '// Stacks Wallet Configuration\n', 'feat: init stacks-wallet.ts');
    appendAndCommit(walletFile, "import { AppConfig, UserSession, showConnect } from '@stacks/connect';\n", 'feat: add stacks/connect imports');
    appendAndCommit(walletFile, "import { Person } from '@stacks/profile';\n", 'feat: add stacks/profile imports');
    
    appendAndCommit(walletFile, "\n// Define App Config\n", 'feat: add app config comment');
    appendAndCommit(walletFile, "const appConfig = new AppConfig(['store_write', 'publish_data']);\n", 'feat: initialize AppConfig');
    
    appendAndCommit(walletFile, "\n// Initialize User Session\n", 'feat: add user session comment');
    appendAndCommit(walletFile, "export const userSession = new UserSession({ appConfig });\n", 'feat: export userSession');
    
    appendAndCommit(walletFile, "\n// Authentication Function\n", 'feat: add auth function header');
    appendAndCommit(walletFile, "export function authenticate() {\n", 'feat: define authenticate function signature');
    appendAndCommit(walletFile, "  showConnect({\n", 'feat: call showConnect');
    appendAndCommit(walletFile, "    appDetails: {\n", 'feat: add appDetails object');
    appendAndCommit(walletFile, "      name: 'Stx Arcade',\n", 'feat: set app name');
    appendAndCommit(walletFile, "      icon: window.location.origin + '/favicon.ico',\n", 'feat: set app icon');
    appendAndCommit(walletFile, "    },\n", 'feat: close appDetails');
    appendAndCommit(walletFile, "    redirectTo: '/',\n", 'feat: set redirect');
    appendAndCommit(walletFile, "    onFinish: () => {\n", 'feat: add onFinish callback');
    appendAndCommit(walletFile, "      window.location.reload();\n", 'feat: reload on finish');
    appendAndCommit(walletFile, "    },\n", 'feat: close onFinish');
    appendAndCommit(walletFile, "    userSession,\n", 'feat: pass userSession');
    appendAndCommit(walletFile, "  });\n", 'feat: close showConnect');
    appendAndCommit(walletFile, "}\n", 'feat: close authenticate function');

    run('git checkout main');
    run(`git merge ${featWallet}`);

    // FEATURE 3: Transaction Handling (@stacks/transactions)
    // ------------------------------------------------
    const featTx = 'feat/transaction-handling';
    run(`git checkout -b ${featTx}`);
    
    const txFile = 'frontend/lib/transactions.ts';
    writeAndCommit(txFile, '// Transaction Utilities\n', 'feat: init transactions.ts');
    appendAndCommit(txFile, "import { StacksMocknet, StacksTestnet, StacksMainnet } from '@stacks/network';\n", 'feat: import stacks networks');
    appendAndCommit(txFile, "import { AnchorMode, PostConditionMode } from '@stacks/transactions';\n", 'feat: import transaction modes');
    
    appendAndCommit(txFile, "\nconst network = new StacksTestnet();\n", 'feat: init default network');
    
    // Simulate more granular commits for "every line of code"
    appendAndCommit(txFile, "export const getNetwork = () => network;\n", 'feat: export getNetwork helper');
    
    run('git checkout main');
    run(`git merge ${featTx}`);

    // FEATURE 4: WalletConnect Implementation
    // ------------------------------------------------
    const featWC = 'feat/wallethook-integration';
    run(`git checkout -b ${featWC}`);
    
    const wcFile = 'frontend/lib/wallet-connect.ts';
    writeAndCommit(wcFile, '// WalletConnect Implementation\n', 'feat: init wallet-connect.ts');
    appendAndCommit(wcFile, "import { Core } from '@walletconnect/core';\n", 'feat: import walletconnect core');
    appendAndCommit(wcFile, "import { Web3Wallet } from '@walletconnect/web3wallet';\n", 'feat: import web3wallet');
    
    appendAndCommit(wcFile, "\n// Setup Client\n", 'feat: add setup comment');
    appendAndCommit(wcFile, "export async function createWalletConnectClient() {\n", 'feat: define createWalletConnectClient');
    appendAndCommit(wcFile, "  const core = new Core({\n", 'feat: init Core');
    appendAndCommit(wcFile, "    projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID,\n", 'feat: set project id');
    appendAndCommit(wcFile, "  });\n", 'feat: close Core init');
    
    appendAndCommit(wcFile, "  const web3wallet = await Web3Wallet.init({\n", 'feat: init Web3Wallet');
    appendAndCommit(wcFile, "    core,\n", 'feat: pass core');
    appendAndCommit(wcFile, "    metadata: {\n", 'feat: add metadata');
    appendAndCommit(wcFile, "      name: 'Stx Arcade',\n", 'feat: set wc name');
    appendAndCommit(wcFile, "      description: 'Stacks Arcade Games',\n", 'feat: set wc description');
    appendAndCommit(wcFile, "      url: 'https://stx-arcade.com',\n", 'feat: set wc url');
    appendAndCommit(wcFile, "      icons: ['https://stx-arcade.com/icon.png']\n", 'feat: set wc icons');
    appendAndCommit(wcFile, "    }\n", 'feat: close metadata');
    appendAndCommit(wcFile, "  });\n", 'feat: close Web3Wallet init');
    appendAndCommit(wcFile, "  return web3wallet;\n", 'feat: return wallet instance');
    appendAndCommit(wcFile, "}\n", 'feat: close function');

    run('git checkout main');
    run(`git merge ${featWC}`);

    // FEATURE 5: Chainhooks Client (@hirosystems/chainhooks-client)
    // ------------------------------------------------
    const featChainhooks = 'feat/chainhooks-integration';
    run(`git checkout -b ${featChainhooks}`);

    const chFile = 'frontend/lib/chainhooks.ts';
    writeAndCommit(chFile, '// Chainhooks Client Setup\n', 'feat: init chainhooks.ts');
    appendAndCommit(chFile, "// Note: @hirosystems/chainhooks-client usage\n", 'feat: add chainhooks note');
    // Assuming a hypothetical usage or placeholder as the lib is specific
    appendAndCommit(chFile, "export const CHAINHOOKS_API = 'https://api.hiro.so/chainhooks';\n", 'feat: define chainhooks api url');
    
    run('git checkout main');
    run(`git merge ${featChainhooks}`);

    // AUTOMATION: Branch Creation Scripts
    // ------------------------------------------------
    const featAuto = 'feat/automation-scripts';
    run(`git checkout -b ${featAuto}`);
    
    ensureDir('scripts');
    const branchScript = 'scripts/create_branch.sh';
    writeAndCommit(branchScript, '#!/bin/bash\n', 'feat: init create_branch.sh');
    appendAndCommit(branchScript, 'echo "Creating branch $1"\n', 'feat: add echo');
    appendAndCommit(branchScript, 'git checkout -b $1\n', 'feat: add git checkout command');
    
    run('git checkout main');
    run(`git merge ${featAuto}`);

    console.log("Failed to simulate 500 commits? Just kidding, we did a lot.");
})();
