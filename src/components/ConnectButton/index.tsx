import { ChainId, Currency, NATIVE, SUSHI_ADDRESS } from '@sushiswap/sdk'
import { Feature, featureEnabled } from '../../functions/feature'
import React, { useEffect, useState } from 'react'

// import More from './More'
import { Popover } from '@headlessui/react'
import Web3Status from '../Web3Status'
import { t } from '@lingui/macro'
import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'
import { useETHBalances } from '../../state/wallet/hooks'
import { useSourceChain, useDestinationChain } from '../../state/application/hooks'
import cookie from 'cookie-cutter'
import { setDestinationChain, setSourceChain } from '../../state/application/actions'
import { useDispatch } from 'react-redux'

import Button, { ButtonProps } from '../Button'
import ReactGA from 'react-ga'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { SUPPORTED_WALLETS, injected } from '../../config/wallets'

const WALLET_VIEWS = {
  OPTIONS: 'options',
  OPTIONS_SECONDARY: 'options_secondary',
  ACCOUNT: 'account',
  PENDING: 'pending',
}

export default function ConnectButton() {
  const { account, chainId, library, connector, activate, error, deactivate } = useActiveWeb3React()
  const dispatch = useDispatch()
  const initialChain = ChainId.MAINNET.toString()
  const initialDestination = ChainId.MATIC.toString()

  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']

  const METAMASK = SUPPORTED_WALLETS['METAMASK']

  const [connecting, setConnecting] = useState<boolean>(false)
  const [pendingError, setPendingError] = useState<boolean>()

  const tryActivation = async (connector: (() => Promise<AbstractConnector>) | AbstractConnector | undefined) => {
    let name = ''
    let conn = typeof connector === 'function' ? await connector() : connector

    Object.keys(SUPPORTED_WALLETS).map((key) => {
      if (connector === SUPPORTED_WALLETS[key].connector) {
        return (name = SUPPORTED_WALLETS[key].name)
      }
      return true
    })
    // log selected wallet
    // ReactGA.event({
    //     category: 'Wallet',
    //     action: 'Change Wallet',
    //     label: name,
    // })
    setConnecting(true)

    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (conn instanceof WalletConnectConnector && conn.walletConnectProvider?.wc?.uri) {
      conn.walletConnectProvider = undefined
    }

    conn &&
      activate(conn, undefined, true).catch((error) => {
        if (error instanceof UnsupportedChainIdError) {
          activate(conn) // a little janky...can't use setError because the connector isn't set
        } else {
          setConnecting(false)
          setPendingError(true)
        }
      })
  }

  const errorJSX = () => {
    return (
      <div className="text-center" style={{ marginTop: '1rem', color: 'white' }}>
        <i className="fal fa-exclamation-triangle"></i>&ensp;An error has occured, please try again.
      </div>
    )
  }

  return (
    <>
      <Button
        id="connect-wallet"
        onClick={() => tryActivation(METAMASK.connector)}
        color={'gradient'}
        size={'lg'}
        className={'w-full'}
      >
        {connecting ? 'Check your MetaMask Widget...' : `Click to connect your wallet`}
      </Button>
      {pendingError && errorJSX()}
    </>
  )
}
