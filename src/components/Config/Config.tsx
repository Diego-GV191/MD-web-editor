import './index.css'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { FormConfig } from './FormConfig'
import { useConfigContext } from './ConfigContext'
import { ConfigBarPosition } from './utils'
import { useAppContext } from '../AppContext'
import { ConfigIcon } from '../Icons'

export const Config = () => {
  const { showConfig, setShowConfig, barPosition } = useConfigContext()
  const { sizeWindow, limitsWindow } = useAppContext()
  const [outAnim, setOutAnim] = useState<boolean>(false)
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true)

  useEffect(() => {
    const handleAnimationEnd = (e: AnimationEvent) => {
      if (!showConfig && e.animationName === 'configEndAnim') {
        setOutAnim(false)
      }
    }

    window.addEventListener('animationend', handleAnimationEnd)
    return () => {
      window.removeEventListener('animationend', handleAnimationEnd)
    }
  }, [showConfig])

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false)
      return
    }
    if (!showConfig) {
      setOutAnim(true)
    }
  }, [showConfig])

  return (
    <>
      <div
        className={twMerge(
          sizeWindow.width < limitsWindow.minWidth
            ? barPosition === ConfigBarPosition.right
              ? 'bottom-5 right-24'
              : barPosition === ConfigBarPosition.bottom
                ? 'bottom-14 right-5'
                : 'bottom-5 right-5'
            : barPosition === ConfigBarPosition.right
              ? 'bottom-5 right-48'
              : barPosition === ConfigBarPosition.bottom
                ? 'bottom-44 right-5'
                : 'bottom-5 right-5',
          'fixed',
          'rounded-3xl',
          'bg-violet-400/50',
          'flex justify-center items-center',
          'backdrop-blur-sm',
          'select-none',
          'h-24 w-24',
          'duration-500',
        )}
        onClick={() => setShowConfig(true)}
      >
        {!showConfig && (
          <div className="p-5">
            <ConfigIcon size={70} color="#111827" className="bg-g" />
          </div>
        )}
      </div>

      {(showConfig || (outAnim && !isFirstLoad)) && (
        <FormConfig className={twMerge(showConfig ? 'config-start-anim' : 'config-end-anim')} />
      )}
      {/* <FormConfig /> */}
    </>
  )
}
