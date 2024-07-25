import { twMerge } from 'tailwind-merge'
import { GroupButtonsProps } from './utils'
import { useAppContext } from '@renderer/components/AppContext'
import { CSSProperties, useRef, useState } from 'react'
import { ConfigBarPosition, useConfigContext } from '@renderer/components/Config'

export const GropButtons = ({ name, mode: Mode }: GroupButtonsProps) => {
  const { sizeWindow, limitsWindow } = useAppContext()
  const { barPosition } = useConfigContext()
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false)
  const spanRef = useRef<HTMLSpanElement>(null)
  const divRef = useRef<HTMLDivElement>(null)

  const handleClick = () => {
    const divRect = divRef.current?.getBoundingClientRect()
    if (!divRect) return

    setPosition({
      x:
        barPosition === ConfigBarPosition.right
          ? sizeWindow.width - divRect.left + 5
          : barPosition === ConfigBarPosition.left
            ? divRect.x + divRect.width + 5
            : divRect.x,
      y:
        barPosition === ConfigBarPosition.top
          ? divRect.y + divRect.height + 5
          : barPosition === ConfigBarPosition.bottom
            ? sizeWindow.height - divRect.top + 5
            : divRect.y,
    })

    // setPosition({
    //   x: barPosition === ConfigBarPosition.right ? sizeWindow.width - divRect.left + 5 : divRect.x,
    //   y: divRect.y,
    // })

    setIsMenuVisible(!isMenuVisible)
  }

  const menuStyles: CSSProperties = {
    top:
      barPosition === ConfigBarPosition.right || barPosition === ConfigBarPosition.left
        ? position.y
        : barPosition === ConfigBarPosition.top
          ? position.y
          : 'auto',
    left:
      barPosition === ConfigBarPosition.bottom ||
      barPosition === ConfigBarPosition.left ||
      barPosition === ConfigBarPosition.top
        ? position.x
        : 'auto',
    right: barPosition === ConfigBarPosition.right ? position.x : 'auto',
    bottom: barPosition === ConfigBarPosition.bottom ? position.y : 'auto',
    position: 'fixed',
  }

  return (
    <div
      ref={divRef}
      className={twMerge(
        'bg-slate-900',
        'text-zinc-200',
        'rounded-lg',
        'flex justify-center items-center flex-col',
        'no-drag',
        barPosition === ConfigBarPosition.left || barPosition === ConfigBarPosition.right
          ? 'my-2 h-fit w-full'
          : 'mx-2 h-full',
        sizeWindow.width < limitsWindow.minWidth ? 'text-wrap' : 'text-nowrap',
        barPosition === ConfigBarPosition.left || barPosition === ConfigBarPosition.right
          ? 'text-wrap'
          : 'text-nowrap',
      )}
    >
      <div
        className={twMerge(
          'bg-slate-700',
          'w-full min-w-fit h-full',
          'rounded-lg p-2',
          'flex justify-center',
          sizeWindow.width < limitsWindow.minWidth ? 'hidden' : '',
        )}
      >
        {Mode && <Mode />}
      </div>

      {isMenuVisible && sizeWindow.width < limitsWindow.minWidth && (
        <div
          style={menuStyles}
          className={twMerge(
            'bg-slate-700',
            'w-fit min-w-fit h-fit',
            'rounded-lg',
            'shadow-lg',
            'flex flex-col',
          )}
        >
          {Mode && <Mode />}
        </div>
      )}
      <span
        ref={spanRef}
        className={twMerge(
          sizeWindow.width < limitsWindow.minWidth ? 'cursor-pointer' : 'cursor-default',
          'pb-1 px-1',
        )}
        onClick={handleClick}
      >
        {name}
      </span>
    </div>
  )
}
