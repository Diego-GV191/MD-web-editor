import { useAppContext } from '@renderer/components/AppContext'
import { twMerge } from 'tailwind-merge'

export const Nav = () => {
  const { sizeWindow, limitsWindow } = useAppContext()

  return (
    <div
      className={twMerge(
        'fixed',
        'flex justify-center items-center',
        'left-0 right-0',
        'h-10',
        'bg-slate-700 text-neutral-200',
        'shadow-lg',
        'titlebar',
        sizeWindow.width < limitsWindow.minWidth ? '-top-10' : 'top-0',
      )}
      // style={{ paddingRight: '137px' }} // Dimensiones de los botones de la ventana son 137 x h
    ></div>
  )
}
