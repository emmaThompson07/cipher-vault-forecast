# Cipher Vault Forecast

A secure treasury analytics and prediction platform built with FHE (Fully Homomorphic Encryption) technology.

## Features

- **Encrypted Treasury Analytics**: Real-time encrypted treasury data analysis
- **Predictive Forecasting**: Advanced prediction models for treasury management
- **Wallet Integration**: Secure wallet connection with MetaMask and other providers
- **FHE Technology**: Fully homomorphic encryption for data privacy
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS

## Technologies Used

This project is built with:

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Radix UI, Tailwind CSS
- **Wallet Integration**: Wagmi, RainbowKit, Viem
- **Blockchain**: Ethereum, FHE contracts
- **Charts**: Recharts
- **State Management**: TanStack Query

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

```sh
# Clone the repository
git clone https://github.com/emmaThompson07/cipher-vault-forecast.git

# Navigate to the project directory
cd cipher-vault-forecast

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=your_rpc_url
```

## Development

```sh
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## Deployment

This project can be deployed to Vercel:

1. Connect your GitHub repository to Vercel
2. Set up environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## Smart Contracts

The project includes FHE-enabled smart contracts for secure treasury operations:

- **CipherVaultForecast.sol**: Main contract with FHE encryption
- **Sepolia Testnet**: Deployed on Ethereum Sepolia testnet

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
