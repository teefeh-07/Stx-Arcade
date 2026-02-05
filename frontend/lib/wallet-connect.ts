// WalletConnect Implementation
import { Core } from '@walletconnect/core';
import { Web3Wallet } from '@walletconnect/web3wallet';

// Setup Client
export async function createWalletConnectClient() {
  const core = new Core({
    projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID,
  });
