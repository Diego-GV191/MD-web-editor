import { useAppContext } from '@renderer/components/AppContext'
import { twMerge } from 'tailwind-merge'
import './index.css'
import { MDIcon } from '@renderer/components/Icons'

export const TitleBar = () => {
  const { sizeWindow, limitsWindow } = useAppContext()
  return (
    <div
      className={twMerge(
        'fixed',
        'flex items-center',
        'right-0 top-0',
        'h-10',
        'bg-transparent',
        'text-neutral-200',
        'select-none space-x-2',
        'titlebar',
        sizeWindow.width < limitsWindow.minWidth ? 'justify-end mr-10' : 'justify-center',
        sizeWindow.width < limitsWindow.minWidth ? '' : 'left-0',
      )}
      style={{ zIndex: 9999999999999 }}
    >
      <MDIcon />
      {sizeWindow.width > limitsWindow.minWidth && <h1>MarkDown Editor</h1>}
    </div>
  )
}
