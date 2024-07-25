import { FormPopUp, syntaxEnum, titleEnum, useFormContext } from '@renderer/components/FormPopUp'
import { twMerge } from 'tailwind-merge'

export const Paragraph = () => {
  const { form, setForm, setIsClosing, setIsShow } = useFormContext()

  const handleClick = (newTitle: titleEnum) => {
    setIsShow(true)
    setIsClosing(false)
    setForm({ title: newTitle })
  }

  return (
    <>
      {form.title === titleEnum.paragraph && (
        <FormPopUp title={form.title} syntax={syntaxEnum.paragraph} />
      )}

      <div className="grid grid-cols-1">
        <button
          onClick={() => handleClick(titleEnum.paragraph)}
          className={twMerge('m-1 p-2', 'bg-slate-500/50 rounded-lg')}
        >
          {titleEnum.paragraph}
        </button>
      </div>
    </>
  )
}
