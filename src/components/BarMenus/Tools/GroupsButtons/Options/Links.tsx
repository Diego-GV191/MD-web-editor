import { FormPopUp, syntaxEnum, titleEnum, useFormContext } from '@renderer/components/FormPopUp'
import { twMerge } from 'tailwind-merge'

export const Links = () => {
  const { form, setForm, setIsClosing, setIsShow } = useFormContext()

  const handleClick = (newTitle: titleEnum) => {
    setIsShow(true)
    setIsClosing(false)
    setForm({ title: newTitle })
  }

  return (
    <>
      {form.title === titleEnum.links && <FormPopUp title={form.title} syntax={syntaxEnum.links} />}
      {form.title === titleEnum.images && (
        <FormPopUp title={form.title} syntax={syntaxEnum.images} />
      )}

      <div className="grid grid-cols-1">
        <button
          onClick={() => handleClick(titleEnum.links)}
          className={twMerge('m-1 p-2', 'bg-slate-500/50 rounded-lg')}
        >
          {titleEnum.links}
        </button>
        <button
          onClick={() => handleClick(titleEnum.images)}
          className={twMerge('m-1 p-2', 'bg-slate-500/50 rounded-lg')}
        >
          {titleEnum.images}
        </button>
      </div>
    </>
  )
}
