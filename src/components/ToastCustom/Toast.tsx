import { twMerge } from 'tailwind-merge'
import { ToastCustomEnum, ToastProps } from './utils'
import { useEffect, useState } from 'react'
import { ErrorIcon, SuccessIcon } from '../Icons'

export const Toast = ({ t, body, status, title }: ToastProps) => {
  const [anim, setAnim] = useState<boolean>(false)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (t?.visible) {
      timer = setTimeout(() => {
        setAnim(true)
      }, 100)
    }
    return () => {
      setAnim(false)
      clearTimeout(timer)
    }
  }, [t?.visible])

  return (
    <div
      className={twMerge(
        anim ? 'top-4' : '-top-36',
        'max-w-md w-full bg-neutral-100/75 dark:bg-neutral-700/75 backdrop-blur-sm shadow-lg rounded-2xl flex',
        'p-2 flex items-center duration-200 absolute select-none',
      )}
      style={{ zIndex: 99999999 }}
    >
      <span
        className={twMerge(
          status === ToastCustomEnum.error && 'bg-red-600/90',
          status === ToastCustomEnum.success && 'bg-green-600/90',
          'h-14 w-16 flex justify-center items-center rounded-full',
        )}
      >
        {status === ToastCustomEnum.error && <ErrorIcon className="h-10 w-12 text-gray-900" />}
        {status === ToastCustomEnum.success && <SuccessIcon className="h-10 w-12" />}
      </span>
      <div
        className={twMerge(
          'bg-zinc-200 dark:bg-zinc-800 p-2 dark:text-zinc-100',
          'rounded-2xl w-full ml-3 text-lg',
        )}
      >
        <div className="text-lg border-b-gray-600 border-b-2">{title}</div>
        <div className={twMerge('whitespace-pre-wraps', 'text-base')}>{body}</div>
      </div>
    </div>
  )
}
