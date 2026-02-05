// WalletConnect Implementation
import { Core } from '@walletconnect/core';
import { Web3Wallet } from '@walletconnect/web3wallet';

// Setup Client
export async function createWalletConnectClient() {
  const core = new Core({
    projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID,
  });
  const web3wallet = await Web3Wallet.init({
    core,
    metadata: {
      name: 'Stx Arcade',
      description: 'Stacks Arcade Games',
      url: 'https://stx-arcade.com',
      icons: ['https://stx-arcade.com/icon.png']
    }
