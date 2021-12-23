import { isMobile } from 'react-device-detect'
import { FC } from 'react'
import { classNames } from '../../functions'

const DoubleGlowShadow: FC<{ className?: string }> = ({ children, className }) => {
  if (isMobile) {
    return <div className="shadow-swap">{children}</div>
  }

  return (
    <div className={classNames(className, 'relative w-full')}>
      <div className="absolute" />
      <div className="absolute" />
      <div className="relative">{children}</div>
    </div>
  )
}

export default DoubleGlowShadow
