import { FormPopUp, useFormContext } from '@renderer/components/FormPopUp'
import { syntaxEnum, titleEnum } from '@renderer/components/FormPopUp/utils'
import { twMerge } from 'tailwind-merge'

export const BlockQuotes = () => {
  const { form, setForm, setIsClosing, setIsShow } = useFormContext()

  const handleClick = (newTitle: titleEnum) => {
    setIsShow(true)
    setIsClosing(false)
    setForm({ title: newTitle })
  }

  return (
    <>
      {form.title === titleEnum.blockQuote1 && (
        <FormPopUp title={form.title} syntax={syntaxEnum.blockQuote1} />
      )}
      {form.title === titleEnum.blockQuote2 && (
        <FormPopUp title={form.title} syntax={syntaxEnum.blockQuote2} />
      )}

      <div className="grid grid-cols-1">
        <button
          onClick={() => handleClick(titleEnum.blockQuote1)}
          className={twMerge('m-1 p-2', 'bg-slate-500/50 rounded-lg')}
        >
          {titleEnum.blockQuote1}
        </button>
        <button
          onClick={() => handleClick(titleEnum.blockQuote2)}
          className={twMerge('m-1 p-2', 'bg-slate-500/50 rounded-lg')}
        >
          {titleEnum.blockQuote2}
        </button>
      </div>
    </>
  )
}
