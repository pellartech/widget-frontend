import { ChainId, Currency, NATIVE, SUSHI_ADDRESS } from '@sushiswap/sdk'
import { Feature, featureEnabled } from '../../functions/feature'
import React, { useEffect, useState } from 'react'

import More from './More'
import { Popover } from '@headlessui/react'
import Web3Status from '../Web3Status'
import { t } from '@lingui/macro'
import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'
import { useETHBalances } from '../../state/wallet/hooks'
import { useSourceChain, useDestinationChain } from '../../state/application/hooks'
import cookie from 'cookie-cutter'
import { setDestinationChain, setSourceChain } from '../../state/application/actions'
import { useDispatch } from 'react-redux'
function AppBar(): JSX.Element {
  const { account, chainId, library } = useActiveWeb3React()
  const dispatch = useDispatch()
  const initialChain = ChainId.MAINNET.toString()
  const initialDestination = ChainId.MATIC.toString()

  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']

  return (
    //     // <header className="flex flex-row justify-between w-screen flex-nowrap">
    <header className="flex-shrink-0 w-full">
      <Popover as="nav" className="z-10 w-full bg-transparent header-border-b">
        {({ open }) => (
          <>
            <div className="px-4 py-4">
              <div className="items-center justify-between">
                <div className="flex items-center justify-center p-4">
                  <div className="flex items-center w-full space-x-2 item-header">
                    <div className="w-auto flex items-center rounded bg-dark-gray p-0.5 whitespace-nowrap">
                      {account && chainId && userEthBalance && (
                        <>
                          <div className="px-3 py-2 primary-text">
                            {userEthBalance?.toSignificant(4)} {NATIVE[chainId].symbol}
                          </div>
                        </>
                      )}

                      <Web3Status />
                    </div>
                    <More />
                  </div>
                </div>
                <div className="flex -mr-2 sm:hidden">
                  {/* Mobile menu button */}
                  <Popover.Button className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-high-emphesis focus:outline-none">
                    <span className="sr-only">{`Open main menu`}</span>
                  </Popover.Button>
                </div>
              </div>
            </div>
          </>
        )}
      </Popover>
    </header>
  )
}

export default AppBar
