import { useMDContext } from '@renderer/components/MDEditor'
import React, { createContext, useContext, useEffect, useRef, useState } from 'react'

interface FormContextType {
  form: { title: string }
  setForm: React.Dispatch<React.SetStateAction<{ title: string }>>
  isShow: boolean
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>
  isClosing: boolean
  setIsClosing: React.Dispatch<React.SetStateAction<boolean>>
  add: string
  setAdd: React.Dispatch<React.SetStateAction<any>>
  code: string[]
  setCode: React.Dispatch<React.SetStateAction<string[]>>
  images: string[]
  setImages: React.Dispatch<React.SetStateAction<string[]>>
  links: string[]
  setLinks: React.Dispatch<React.SetStateAction<string[]>>
  popupRef: React.RefObject<HTMLDivElement>
  handleClose: () => void
  handleSave: () => void
  addIn: string[]
  setAddIn: React.Dispatch<React.SetStateAction<string[]>>
  AddInput: number
  setAddInput: React.Dispatch<React.SetStateAction<number>>
  inputErrors: boolean[]
  setInputErrors: React.Dispatch<React.SetStateAction<boolean[]>>
}

const defaultValue: FormContextType = {
  form: { title: '' },
  setForm: () => {},
  isShow: true,
  setIsShow: () => {},
  isClosing: false,
  setIsClosing: () => {},
  add: '',
  setAdd: () => {},
  code: [],
  setCode: () => {},
  images: [],
  setImages: () => {},
  links: [],
  setLinks: () => {},
  popupRef: { current: null } as React.RefObject<HTMLDivElement>,
  handleClose: () => {},
  handleSave: () => {},
  addIn: [],
  setAddIn: () => {},
  AddInput: 0,
  setAddInput: () => {},
  inputErrors: [],
  setInputErrors: () => {},
}

const FormContext = createContext<FormContextType>(defaultValue)

export const useFormContext = () => useContext(FormContext)

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const { setMdValue } = useMDContext()
  const [form, setForm] = useState<{ title: string }>({ title: '' })
  const [isShow, setIsShow] = useState<boolean>(true)
  const [isClosing, setIsClosing] = useState<boolean>(false)
  const [add, setAdd] = useState<string>('')
  const [code, setCode] = useState<string[]>([])
  const [images, setImages] = useState<string[]>([])
  const [links, setLinks] = useState<string[]>([])
  const [addIn, setAddIn] = useState<string[]>([])
  const [AddInput, setAddInput] = useState(0)
  const [inputErrors, setInputErrors] = useState<boolean[]>(Array(AddInput).fill(false))
  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleAnimationEnd = () => {
      if (isClosing) {
        setForm({ title: '' })
        setIsShow(false)
      }
    }

    const popupElement = popupRef.current
    popupElement?.addEventListener('animationend', handleAnimationEnd)

    return () => {
      popupElement?.removeEventListener('animationend', handleAnimationEnd)
    }
  }, [isClosing])

  const handleClose = () => {
    setIsClosing(true)
    setAddIn([])
    setAdd('')
    setCode([])
    setImages([])
    setLinks([])
  }

  const handleSave = () => {
    links.map((item) => {
      setMdValue((prev) => prev + item)
    })

    images.map((item) => {
      setMdValue((prev) => prev + item)
    })

    code.map((item) => {
      setMdValue((prev) => prev + item)
    })

    setMdValue((prev) => prev + add)

    if (addIn.length > 0) {
      addIn.map((item) => {
        setMdValue((prev) => prev + item)
      })
      setAddIn([])
    }

    setMdValue((prev) => prev + '\n')
    handleClose()
  }

  return (
    <FormContext.Provider
      value={{
        form,
        setForm,
        isShow,
        setIsShow,
        add,
        setAdd,
        code,
        setCode,
        images,
        setImages,
        links,
        setLinks,
        isClosing,
        setIsClosing,
        popupRef,
        handleClose,
        handleSave,
        addIn,
        setAddIn,
        AddInput,
        setAddInput,
        inputErrors,
        setInputErrors,
      }}
    >
      {children}
    </FormContext.Provider>
  )
}
