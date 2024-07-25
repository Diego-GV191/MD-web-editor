import { twMerge } from 'tailwind-merge'
import { GropButtons, GroupButtonTitleEnum, ModeComponent } from './GroupsButtons'
import { useAppContext } from '@renderer/components/AppContext'
import { ConfigBarPosition, useConfigContext } from '@renderer/components/Config'

export const Tools = () => {
  const { sizeWindow, limitsWindow } = useAppContext()
  const { barPosition } = useConfigContext()

  return (
    <div
      className={twMerge(
        'fixed',
        'duration-500',
        sizeWindow.width < limitsWindow.minWidth
          ? barPosition === ConfigBarPosition.left
            ? 'top-0 bottom-0 left-0 w-20'
            : barPosition === ConfigBarPosition.right
            ? 'top-0 bottom-0 right-0 w-20'
            : barPosition === ConfigBarPosition.bottom
            ? 'bottom-0 right-0 left-0'
            : 'top-0 right-0 left-0'
          : barPosition === ConfigBarPosition.left
          ? 'top-10 bottom-0 left-0 w-44'
          : barPosition === ConfigBarPosition.right
          ? 'top-10 bottom-0 right-0 w-44'
          : barPosition === ConfigBarPosition.bottom
          ? 'bottom-0 right-0 left-0'
          : 'top-10 right-0 left-0',
      )}
    >
      <div
        className={twMerge(
          'bg-slate-800',
          'select-none',
          'absolute',
          'flex',
          'items-center',
          'overflow-auto',
          sizeWindow.width < limitsWindow.minWidth ? 'titlebar' : 'no-drag',
          sizeWindow.width < limitsWindow.minWidth ? 'h-10 p-1' : 'h-40 p-2',
          sizeWindow.width < limitsWindow.minWidth
            ? 'justify-start'
            : barPosition === ConfigBarPosition.left || barPosition === ConfigBarPosition.right
            ? 'justify-start'
            : 'justify-center',
          barPosition === ConfigBarPosition.left || barPosition === ConfigBarPosition.right
            ? 'h-full w-full flex-col'
            : 'w-full flex-row',
          barPosition === ConfigBarPosition.left
            ? 'left-0'
            : barPosition === ConfigBarPosition.right
            ? sizeWindow.width < limitsWindow.minWidth
              ? 'right-0 top-10'
              : 'right-0 top-0'
            : barPosition === ConfigBarPosition.bottom
            ? 'bottom-0'
            : 'left-0 right-0',
        )}
      >
        <GropButtons name={GroupButtonTitleEnum.headers} mode={ModeComponent.headers} />
        <GropButtons name={GroupButtonTitleEnum.quotes} mode={ModeComponent.blockquotes} />
        <GropButtons name={GroupButtonTitleEnum.lists} mode={ModeComponent.orderLists} />
        <GropButtons name={GroupButtonTitleEnum.code} mode={ModeComponent.code} />
        <GropButtons name={GroupButtonTitleEnum.links} mode={ModeComponent.links} />
        <GropButtons name={GroupButtonTitleEnum.paragraph} mode={ModeComponent.paragraph} />
      </div>
    </div>
  )
}
