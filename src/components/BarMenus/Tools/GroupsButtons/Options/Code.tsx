import { FormPopUp, syntaxEnum, titleEnum, useFormContext } from '@renderer/components/FormPopUp'
import { twMerge } from 'tailwind-merge'

export const Code = () => {
  const { form, setForm, setIsClosing, setIsShow } = useFormContext()

  const handleClick = (newTitle: titleEnum) => {
    setIsShow(true)
    setIsClosing(false)
    setForm({ title: newTitle })
  }

  return (
    <>
      {form.title === titleEnum.code && <FormPopUp title={form.title} syntax={syntaxEnum.code} />}
      {form.title === titleEnum.inlineCode && (
        <FormPopUp title={form.title} syntax={syntaxEnum.inlineCode} />
      )}

      <div className="grid grid-cols-1">
        <button
          onClick={() => handleClick(titleEnum.code)}
          className={twMerge('m-1 p-2', 'bg-slate-500/50 rounded-lg')}
        >
          {titleEnum.code}
        </button>
        <button
          onClick={() => handleClick(titleEnum.inlineCode)}
          className={twMerge('m-1 p-2', 'bg-slate-500/50 rounded-lg')}
        >
          {titleEnum.inlineCode}
        </button>
      </div>
    </>
  )
}
