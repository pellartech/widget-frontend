import { AbstractConnector } from '@web3-react/abstract-connector'
import { ChainId } from '@sushiswap/sdk'
import { InjectedConnector } from '@web3-react/injected-connector'
import { NetworkConnector } from '../entities/NetworkConnector'
import RPC from './rpc'

export const network = new NetworkConnector({
  defaultChainId: 1,
  urls: RPC,
})

const supportedChainIds = Object.values(ChainId) as number[]

export const injected = new InjectedConnector({
  supportedChainIds,
})

export interface WalletInfo {
  connector?: (() => Promise<AbstractConnector>) | AbstractConnector
  name: string
  iconName: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'injected.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true,
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D',
  },
  // WALLET_CONNECT: {
  //   connector: async () => {
  //     const WalletConnectConnector = (await import('@web3-react/walletconnect-connector')).WalletConnectConnector
  //     return new WalletConnectConnector({
  //       rpc: RPC,
  //       bridge: 'https://bridge.walletconnect.org',
  //       qrcode: true,
  //       supportedChainIds: [
  //         1, // mainnet
  //         3, // ropsten
  //         4, // rinkeby
  //         5, // goreli
  //         42, // kovan
  //         250, // fantom
  //         4002, // fantom testnet
  //         137, // matic
  //         80001, // matic testnet
  //         100, // xdaiW
  //         56, // binance smart chain
  //         97, // binance smart chain testnet
  //         1287, // moonbase
  //         43114, // avalanche
  //         43113, // fuji
  //         128, // heco
  //         256, // heco testnet
  //         1666600000, // harmony
  //         1666700000, // harmony testnet
  //         66, // okex testnet
  //         65, // okex testnet
  //         42161, // arbitrum
  //         42220, // celo
  //         11297108109, // palm
  //         1285, // moonriver
  //       ],
  //       // pollingInterval: 15000,
  //     })
  //   },
  //   name: 'WalletConnect',
  //   iconName: 'wallet-connect.svg',
  //   description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
  //   href: null,
  //   color: '#4196FC',
  //   mobile: true,
  // },
  // LATTICE: {
  //   connector: async () => {
  //     const LatticeConnector = (await import('@web3-react/lattice-connector')).LatticeConnector
  //     return new LatticeConnector({
  //       chainId: 1,
  //       url: RPC[ChainId.MAINNET],
  //       appName: 'SushiSwap',
  //     })
  //   },
  //   name: 'Lattice',
  //   iconName: 'lattice.png',
  //   description: 'Connect to GridPlus Wallet.',
  //   href: null,
  //   color: '#40a9ff',
  //   mobile: true,
  // },
  // WALLET_LINK: {
  //   connector: async () => {
  //     const WalletLinkConnector = (await import('@web3-react/walletlink-connector')).WalletLinkConnector
  //     return new WalletLinkConnector({
  //       url: RPC[ChainId.MAINNET],
  //       appName: 'SushiSwap',
  //       appLogoUrl: 'https://raw.githubusercontent.com/sushiswap/art/master/sushi/logo-256x256.png',
  //     })
  //   },
  //   name: 'Coinbase Wallet',
  //   iconName: 'coinbase.svg',
  //   description: 'Use Coinbase Wallet app on mobile device',
  //   href: null,
  //   color: '#315CF5',
  // },
  // COINBASE_LINK: {
  //   name: 'Open in Coinbase Wallet',
  //   iconName: 'coinbase.svg',
  //   description: 'Open in Coinbase Wallet app.',
  //   href: 'https://go.cb-w.com',
  //   color: '#315CF5',
  //   mobile: true,
  //   mobileOnly: true,
  // },
  // Binance: {
  //   connector: async () => {
  //     const BscConnector = (await import('@binance-chain/bsc-connector')).BscConnector
  //     return new BscConnector({
  //       supportedChainIds: [1, 137, 56],
  //     })
  //   },
  //   name: 'Binance',
  //   iconName: 'bsc.jpg',
  //   description: 'Login using Binance hosted wallet',
  //   href: null,
  //   color: '#F0B90B',
  //   mobile: true,
  // },
  // Clover: {
  //   connector: async () => {
  //     const CloverConnector = (await import('@clover-network/clover-connector')).CloverConnector
  //     return new CloverConnector({
  //       supportedChainIds: [1, 137],
  //     })
  //   },
  //   name: 'Clover',
  //   iconName: 'clover.svg',
  //   description: 'Login using Clover hosted wallet',
  //   href: null,
  //   color: '#269964',
  // },
}
