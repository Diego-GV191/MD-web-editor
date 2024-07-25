import { FormPopUp } from '@renderer/components/FormPopUp'
import { syntaxEnum, titleEnum } from '@renderer/components/FormPopUp/utils'
import { useFormContext } from '../../../../FormPopUp/FormContext'
import { twMerge } from 'tailwind-merge'

export const OrderLists = () => {
  const { form, setForm, setIsClosing, setIsShow } = useFormContext()

  const handleClick = (newTitle: titleEnum) => {
    setIsShow(true)
    setIsClosing(false)
    setForm({ title: newTitle })
  }

  return (
    <>
      {form.title === titleEnum.orderList && (
        <FormPopUp title={form.title} syntax={syntaxEnum.orderList} />
      )}
      {form.title === titleEnum.unorderList && (
        <FormPopUp title={form.title} syntax={syntaxEnum.unorderList} />
      )}

      <div className="grid grid-cols-1">
        <button
          onClick={() => handleClick(titleEnum.orderList)}
          className={twMerge('m-1 p-2', 'bg-slate-500/50 rounded-lg')}
        >
          {titleEnum.orderList}
        </button>
        <button
          onClick={() => handleClick(titleEnum.unorderList)}
          className={twMerge('m-1 p-2', 'bg-slate-500/50 rounded-lg')}
        >
          {titleEnum.unorderList}
        </button>
      </div>
    </>
  )
}
