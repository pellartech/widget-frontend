import { ANALYTICS_URL } from '../../constants'
import { ChainId } from '@sushiswap/sdk'
import ExternalLink from '../ExternalLink'
import Polling from '../Polling'
import { t } from '@lingui/macro'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'

const Footer = () => {
  const { chainId } = useActiveWeb3React()
  return (
    // <footer className="absolute bottom-0 flex items-center justify-between w-screen h-20 p-4 mx-auto text-center text-low-emphesis">
    <footer className="flex-shrink-0">
      <div className="flex items-center justify-between h-20 px-4">
        <ExternalLink href="https://www.umbria.network/">
          <img src="https://bridge.umbria.network/assets/images/logos/UmbriaPretty128x117.png?v1" width="32px"></img>
          Made with ♥ by the Umbria Team
        </ExternalLink>

        {chainId && chainId in ANALYTICS_URL && (
          <ExternalLink
            id={`analytics-nav-link`}
            href={ANALYTICS_URL[chainId] || 'https://analytics.sushi.com'}
            className="text-low-emphesis"
          >
            <div className="flex items-center space-x-2">
              <div>{`Analytics`}</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </ExternalLink>
        )}

        {/* <Polling /> */}
      </div>
    </footer>
  )
}

export default Footer
