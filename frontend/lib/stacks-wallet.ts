// Stacks Wallet Configuration
import { AppConfig, UserSession, showConnect } from '@stacks/connect';
import { Person } from '@stacks/profile';

// Define App Config
const appConfig = new AppConfig(['store_write', 'publish_data']);

// Initialize User Session
export const userSession = new UserSession({ appConfig });

// Authentication Function
export function authenticate() {
  showConnect({
