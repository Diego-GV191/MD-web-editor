import { twMerge } from 'tailwind-merge'
import { CloseIcon, MDIcon } from '../Icons'
import { useConfigContext } from './ConfigContext'
import { Options } from './Options'
import { FormOptions } from './FormOptions'
import { useAppContext } from '../AppContext'
import { ConfigProps, OptionsTitleEnum } from './utils'
import { useEffect } from 'react'

export const FormConfig = ({ className }: ConfigProps) => {
  const { setShowConfig, optionTitle, setOptionTitle } = useConfigContext()
  const { sizeWindow, limitsWindow } = useAppContext()

  const handleClick = (text: OptionsTitleEnum) => {
    if (optionTitle === text) {
      setOptionTitle(OptionsTitleEnum.none)
      return
    }
    setOptionTitle(text)
  }

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowConfig(false)
      }
    }

    window.addEventListener('keyup', handleKey)
    return () => {
      window.removeEventListener('keyup', handleKey)
    }
  }, [])

  return (
    <div
      className={twMerge(
        'fixed',
        'top-0 left-0 right-0 bottom-0',
        'h-full w-full',
        'bg-neutral-600/50 backdrop-blur-lg',
        'flex justify-center items-center',
        'select-none',
        className,
      )}
      style={{ zIndex: 9999 }}
    >
      <div className={twMerge('flex flex-row', 'h-full w-full')}>
        <div
          className={twMerge(
            'left-0 bottom-0 top-0',
            'p-5 pt-10',
            ' h-full w-[30%]',
            'bg-slate-800/50',
            'overflow-y-auto',
          )}
        >
          <div
            className={twMerge('h-fit w-fit', 'p-2 rounded-3xl', 'bg-violet-500/50')}
            onClick={() => setShowConfig(false)}
          >
            <CloseIcon
              className={twMerge(
                sizeWindow.width < limitsWindow.minWidth ? 'h-8 w-8' : 'h-16 w-16',
                'text-zinc-300',
              )}
            />
          </div>

          <Options
            title={OptionsTitleEnum.save}
            onClick={() => handleClick(OptionsTitleEnum.save)}
          />
          <Options
            title={OptionsTitleEnum.editor}
            onClick={() => handleClick(OptionsTitleEnum.editor)}
          />
          <Options
            title={OptionsTitleEnum.about}
            onClick={() => handleClick(OptionsTitleEnum.about)}
          />
        </div>

        {optionTitle === OptionsTitleEnum.none ? (
          <div
            className={twMerge(
              'right-0 bottom-0 top-0',
              'p-5 pt-10',
              ' h-full w-[70%]',
              'bg-slate-600/50',
              'flex justify-center items-center',
            )}
          >
            <div className="h-fit w-fit">
              <MDIcon className="h-96 w-96" color="#1e293b" />
            </div>
          </div>
        ) : (
          <div
            className={twMerge(
              'right-0 bottom-0 top-0',
              'p-5 pt-10',
              ' h-full w-[70%]',
              'bg-slate-600/50',
            )}
          >
            <FormOptions title={optionTitle} />
          </div>
        )}
      </div>
    </div>
  )
}
