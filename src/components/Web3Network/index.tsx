import { NETWORK_ICON, NETWORK_LABEL } from '../../config/networks'

import Image from 'next/image'
import NetworkModel from '../../modals/NetworkModal'
import React from 'react'
import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'
import {
  useNetworkModalToggle,
  useWalletModalToggle,
  useDestinationChain,
  useSourceChain,
} from '../../state/application/hooks'
import { Shuffle } from 'react-feather'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setSourceChain, setDestinationChain } from '../../state/application/actions'
import { getDestinationChainName, getSourceChainName } from '../../services/umbria/fetchers/service'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { updateUserExpertMode } from '../../state/user/actions'
import { useExpertModeManager } from '../../state/user/hooks'

import Web3Status from '../Web3Status'
import More from '../../components/Header/More'
import { ChainId, NATIVE } from '@sushiswap/sdk'
import { Popover } from '@headlessui/react'
import { useETHBalances, useTokenBalances } from '../../state/wallet/hooks'
import { COMMON_BASES } from '../../config/routing'

function Web3Network(): JSX.Element | null {
  const { account, chainId, library } = useActiveWeb3React()
  const dispatch = useDispatch()
  const toggleWalletModal = useWalletModalToggle()
  const toggleSourceModal = useNetworkModalToggle()
  var destinationChain = useDestinationChain()
  // console.log('destination', destinationChain)
  var sourceChain = useSourceChain()
  var otherChainId = 0
  var [isExpertMode] = useExpertModeManager()

  const MATIC_WETH = COMMON_BASES[137][0]
  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  const getWethBalance = useTokenBalances(account ?? undefined, [MATIC_WETH])
  const userWethBalance = getWethBalance[MATIC_WETH.address]
  if (!account) {
    return (
      <div className="flex items-center rounded bg-dark-gray p-0.5 whitespace-nowrap">
        <div
          className="px-3 py-2 space-x-2 text-sm rounded-lg auto-cols-max text-primary primary-text"
          style={{ width: '100%', textAlign: 'center' }}
          onClick={() => toggleWalletModal()}
        >
          Please connect your account before bridging. <br />
          If you have switched accounts you will have to reconnect to use the bridge.
        </div>
        <NetworkModel />
      </div>
    )
  }

  if (!chainId) {
    return null
  }

  // useEffect(() => {
  //   if (!isExpertMode) {
  //     dispatch(updateUserExpertMode({ userExpertMode: true }))
  //   }
  // }, [dispatch, isExpertMode])

  function updateNetworks() {}

  console.log('chains', NETWORK_LABEL[sourceChain], NETWORK_LABEL[destinationChain])

  return (
    <div
      className="flex items-center rounded p-0.5 whitespace-nowrap text-sm font-bold cursor-pointer select-none pointer-events-auto"
      style={{ justifyContent: 'space-between' }}
    >
      <div>
        <div
          className="grid grid-flow-col px-3 py-2 space-x-2 text-sm rounded-lg pointer-events-auto auto-cols-max bg-dark-gray text-primary"
          onClick={() => [137, 1].includes(Number(sourceChain)) && toggleSourceModal()}
        >
          <div style={{ textAlign: 'center' }}>
            <span className="text-primary" style={{ whiteSpace: 'pre-line' }}>
              {[137, 1].includes(Number(sourceChain))
                ? `Bridging from ${NETWORK_LABEL[sourceChain]} to ${NETWORK_LABEL[destinationChain]}`
                : 'Please connect to Polygon Mainnet or Ethereum Mainnet'}
            </span>
          </div>
          <div style={{ display: [137, 1].includes(Number(sourceChain)) ? 'initial' : 'none' }}>
            <ChevronDownIcon width={16} height={16} className="ml-2 stroke-current" />
          </div>
        </div>
        <NetworkModel />
      </div>
      <div>
        <Popover as="nav" className="z-10 w-full bg-transparent">
          {({ open }) => (
            <>
              <div className="">
                <div className="items-center justify-between">
                  <div className="flex items-center justify-center" style={{ marginRight: '-0.6rem' }}>
                    <div className="flex items-center w-full space-x-2 item-header">
                      <div className="w-auto flex items-center rounded bg-dark-gray p-0.5 whitespace-nowrap">
                        {account && chainId && userEthBalance && (
                          <>
                            <div className="px-3 py-2 text-primary">
                              {chainId === 137
                                ? `${userWethBalance?.toSignificant(4)} WETH`
                                : `${userEthBalance?.toSignificant(4)} ${NATIVE[chainId].symbol}`}
                              {/* {userEthBalance?.toSignificant(4)} {chainId === 137 ? 'WETH' : NATIVE[chainId].symbol} */}
                            </div>
                          </>
                        )}
                        <Web3Status />
                      </div>
                      <More />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default Web3Network
