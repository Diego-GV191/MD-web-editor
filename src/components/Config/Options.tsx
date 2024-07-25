import { twMerge } from 'tailwind-merge'
import { OptionsProps } from './utils'
import { useAppContext } from '../AppContext'

export const Options = ({ title, onClick }: OptionsProps) => {
  const { sizeWindow, limitsWindow } = useAppContext()
  return (
    <div
      onClick={onClick}
      className={twMerge(
        'bg-slate-800 text-zinc-200 hover:bg-slate-700',
        'w-full h-fit p-5 my-2',
        'rounded-xl hover:rounded-3xl',
        'duration-500',
        sizeWindow.width < limitsWindow.minWidth ? 'text-2xl' : 'text-4xl',
      )}
    >
      <span>{title}</span>
    </div>
  )
}
