# Cipher Vault Forecast - Deployment Guide

## Overview

This project is a secure treasury analytics and prediction platform built with FHE (Fully Homomorphic Encryption) technology. It includes a React frontend with wallet integration and FHE-enabled smart contracts.

## Prerequisites

- Node.js 18+ and npm
- Git
- Vercel account (for deployment)
- WalletConnect Project ID
- Ethereum Sepolia testnet RPC URL

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
VITE_WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id
VITE_CIPHER_VAULT_FORECAST_ADDRESS=0x0000000000000000000000000000000000000000
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/your_infura_key
VITE_FHE_RELAYER_URL=https://api.zama.ai/fhevm/relayer
```

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/emmaThompson07/cipher-vault-forecast.git
cd cipher-vault-forecast
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env.local
# Edit .env.local with your actual values
```

4. Start the development server:
```bash
npm run dev
```

## Smart Contract Deployment

The project includes FHE-enabled smart contracts that need to be deployed to Ethereum Sepolia testnet:

1. **Contract**: `CipherVaultForecast.sol`
2. **Network**: Ethereum Sepolia testnet
3. **FHE Support**: Uses Zama's FHEVM for encrypted computations

### Contract Features

- **Encrypted Forecasts**: Create treasury forecasts with encrypted target amounts
- **Private Investments**: Make investments with encrypted amounts using FHE
- **Result Reporting**: Submit encrypted results for forecast verification
- **Reputation System**: Encrypted user reputation tracking
- **Verification**: Admin verification system for forecasts and results

## Vercel Deployment

### Automatic Deployment

1. Connect your GitHub repository to Vercel
2. Set up environment variables in Vercel dashboard:
   - `VITE_WALLET_CONNECT_PROJECT_ID`
   - `VITE_CIPHER_VAULT_FORECAST_ADDRESS`
   - `VITE_RPC_URL`
3. Deploy automatically on push to main branch

### Manual Deployment

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel --prod
```

## Features

### Frontend
- **Wallet Integration**: MetaMask, WalletConnect, and other wallet providers
- **FHE Operations**: Encrypted data processing and computation
- **Real-time Analytics**: Treasury data visualization and forecasting
- **Responsive Design**: Modern UI with Tailwind CSS and shadcn/ui

### Smart Contracts
- **FHE Encryption**: All sensitive data encrypted using Zama's FHEVM
- **Gas Optimization**: Efficient contract design for minimal gas costs
- **Security**: Comprehensive access controls and verification systems
- **Scalability**: Modular design for easy feature additions

## Security Considerations

1. **FHE Implementation**: All sensitive treasury data is encrypted using FHE
2. **Access Controls**: Proper role-based access control in smart contracts
3. **Input Validation**: Comprehensive validation for all user inputs
4. **Audit Ready**: Code structure designed for security audits

## Testing

Run the test suite:
```bash
npm run test
```

Run linting:
```bash
npm run lint
```

## Support

For technical support or questions:
- GitHub Issues: [Repository Issues](https://github.com/emmaThompson07/cipher-vault-forecast/issues)
- Documentation: See README.md for detailed setup instructions

## License

MIT License - see LICENSE file for details
