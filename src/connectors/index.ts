import { BscConnector } from '@binance-chain/bsc-connector'
import { ChainId } from '@sushiswap/sdk'
import { FortmaticConnector } from '../entities/FortmaticConnector'
import { InjectedConnector } from '@web3-react/injected-connector'
import { NetworkConnector } from '../entities/NetworkConnector'
import { PortisConnector } from '@web3-react/portis-connector'
import { TorusConnector } from '@web3-react/torus-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { Web3Provider } from '@ethersproject/providers'

const RPC = {
  [ChainId.MAINNET]: 'https://rpc.umbria.network/eth',
  [ChainId.MATIC]: 'https://rpc.umbria.network/matic',
  //[ChainId.BSC]: 'https://rpc.umbria.network/bsc',
}

export function getNetwork(defaultChainId, urls = RPC) {
  return new NetworkConnector({
    defaultChainId,
    urls,
  })
}

export const network = new NetworkConnector({
  defaultChainId: 1,
  urls: RPC,
})

let networkLibrary: Web3Provider | undefined

export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary = networkLibrary ?? new Web3Provider(network.provider as any))
}

const supportedChainIds = [
  1, // mainnet
  137, // matic
  56, // binance smart chain
]

export const injected = new InjectedConnector({
  supportedChainIds,
})

// mainnet only
export const walletconnect = new WalletConnectConnector({
  rpc: RPC,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  supportedChainIds,
  // pollingInterval: 15000,
})

// mainnet only
export const fortmatic = new FortmaticConnector({
  apiKey: process.env.NEXT_PUBLIC_FORTMATIC_API_KEY ?? '',
  chainId: 1,
})

// mainnet only
export const portis = new PortisConnector({
  dAppId: process.env.NEXT_PUBLIC_PORTIS_ID ?? '',
  networks: [1],
})

// mainnet only
export const walletlink = new WalletLinkConnector({
  url: RPC[ChainId.MAINNET],
  appName: 'SushiSwap',
  appLogoUrl: 'https://raw.githubusercontent.com/sushiswap/art/master/sushi/logo-256x256.png',
})

// mainnet only
export const torus = new TorusConnector({
  chainId: 1,
})

// binance only
export const binance = new BscConnector({ supportedChainIds: [56] })
