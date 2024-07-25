import { twMerge } from 'tailwind-merge'
import { FormPopUp } from '@renderer/components/FormPopUp'
import { useFormContext } from '../../../../FormPopUp/FormContext'
import { syntaxEnum, titleEnum } from '@renderer/components/FormPopUp/utils'
import { ConfigBarPosition, useConfigContext } from '@renderer/components/Config'
import { useAppContext } from '@renderer/components/AppContext'

export const Headers = () => {
  const { form, setForm, setIsClosing, setIsShow } = useFormContext()
  const { barPosition } = useConfigContext()
  const { sizeWindow, limitsWindow } = useAppContext()

  const handleClick = (newTitle: titleEnum) => {
    setIsShow(true)
    setIsClosing(false)
    setForm({ title: newTitle })
  }

  return (
    <>
      {form.title === titleEnum.header1 && (
        <FormPopUp title={form.title} syntax={syntaxEnum.header1} />
      )}
      {form.title === titleEnum.header2 && (
        <FormPopUp title={form.title} syntax={syntaxEnum.header2} />
      )}
      {form.title === titleEnum.header3 && (
        <FormPopUp title={form.title} syntax={syntaxEnum.header3} />
      )}
      {form.title === titleEnum.header4 && (
        <FormPopUp title={form.title} syntax={syntaxEnum.header4} />
      )}
      {form.title === titleEnum.header5 && (
        <FormPopUp title={form.title} syntax={syntaxEnum.header5} />
      )}
      {form.title === titleEnum.header6 && (
        <FormPopUp title={form.title} syntax={syntaxEnum.header6} />
      )}

      <div
        className={twMerge(
          barPosition === ConfigBarPosition.left || barPosition === ConfigBarPosition.right
            ? sizeWindow.width < limitsWindow.minWidth
              ? 'grid grid-cols-2'
              : 'grid grid-cols-1'
            : 'grid grid-cols-3',
        )}
      >
        <button
          onClick={() => handleClick(titleEnum.header1)}
          className={twMerge('m-1 p-2', 'bg-slate-500/50 rounded-lg')}
        >
          {titleEnum.header1}
        </button>
        <button
          onClick={() => handleClick(titleEnum.header2)}
          className={twMerge('m-1 p-2', 'bg-slate-500/50 rounded-lg')}
        >
          {titleEnum.header2}
        </button>
        <button
          onClick={() => handleClick(titleEnum.header3)}
          className={twMerge('m-1 p-2', 'bg-slate-500/50 rounded-lg')}
        >
          {titleEnum.header3}
        </button>
        <button
          onClick={() => handleClick(titleEnum.header4)}
          className={twMerge('m-1 p-2', 'bg-slate-500/50 rounded-lg')}
        >
          {titleEnum.header4}
        </button>
        <button
          onClick={() => handleClick(titleEnum.header5)}
          className={twMerge('m-1 p-2', 'bg-slate-500/50 rounded-lg')}
        >
          {titleEnum.header5}
        </button>
        <button
          onClick={() => handleClick(titleEnum.header6)}
          className={twMerge('m-1 p-2', 'bg-slate-500/50 rounded-lg')}
        >
          {titleEnum.header6}
        </button>
      </div>
    </>
  )
}
