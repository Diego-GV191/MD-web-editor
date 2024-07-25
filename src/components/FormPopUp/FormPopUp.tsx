import './index.css'
import { twMerge } from 'tailwind-merge'
import { FormPopUpProps, syntaxEnum, titleEnum } from './utils'
import { CloseIcon } from '../Icons'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useFormContext } from './FormContext'

export const FormPopUp = ({ title, syntax }: FormPopUpProps) => {
  const {
    isShow,
    isClosing,
    handleClose,
    popupRef,
    setAdd,
    code,
    setCode,
    images,
    setImages,
    links,
    setLinks,
    handleSave,
    form,
    addIn,
    setAddIn,
  } = useFormContext()

  const [AddInput, setAddInput] = useState(0)
  const [inputErrors, setInputErrors] = useState<boolean[]>(Array(AddInput).fill(false))
  const [oneError, setOneError] = useState<boolean>(false)
  const [codeError, setCodeError] = useState<boolean[]>([])
  const [imagesError, setImagesError] = useState<boolean[]>([])
  const [linksError, setLinksError] = useState<boolean[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const textaRef = useRef<HTMLTextAreaElement>(null)
  const bottomPanel = useRef<HTMLDivElement>(null)

  // Handles
  const handleChangeInputs = (index: number, value: string, syntax: syntaxEnum) => {
    const newAddIn = [...addIn]
    newAddIn[index] = '\n' + syntax + value
    setAddIn(newAddIn)

    const newInputErrors = [...inputErrors]
    newInputErrors[index] = value.length < 1
    setInputErrors(newInputErrors)
  }

  const handleFirstInput = (value: string, syntax: syntaxEnum) => {
    const firstError = value.length < 1
    setOneError(firstError)

    setAdd(form.title === titleEnum.inlineCode ? syntax + value + syntax : syntax + value)
  }

  const handleInitCodeinput = (index: number, value: string, syntax: syntaxEnum) => {
    const NewCodeErrors = [...codeError]
    NewCodeErrors[index] = value.length < 1
    setCodeError(NewCodeErrors)

    const text = syntax + value + '\n'
    const NewText = [...code]
    NewText[index] = text
    setCode(NewText)
  }

  const handleCodeinput = (index: number, value: string, syntax: syntaxEnum) => {
    const NewCodeErrors = [...codeError]
    NewCodeErrors[index] = value.length < 1
    setCodeError(NewCodeErrors)

    const text = value + '\n' + syntax + '\n'
    const NewText = [...code]
    NewText[index] = text

    setCode(NewText)
  }

  const handleImagesinput = (index: number, value: string) => {
    const NewCodeErrors = [...imagesError]
    NewCodeErrors[index] = value.length < 1
    setImagesError(NewCodeErrors)

    const text = '(' + value + ')' + '\n'
    const NewText = [...images]
    NewText[index] = text

    setImages(NewText)
  }

  const handleImages = (index: number, value: string, syntax: syntaxEnum) => {
    const NewCodeErrors = [...imagesError]
    NewCodeErrors[index] = value.length < 1
    setImagesError(NewCodeErrors)

    const text = syntax + value + ']'
    const NewText = [...images]
    NewText[index] = text

    setImages(NewText)
  }

  const handleLinksinput = (index: number, value: string) => {
    const NewCodeErrors = [...linksError]
    NewCodeErrors[index] = value.length < 1
    setLinksError(NewCodeErrors)

    const text = '(' + value + ')' + '\n'
    const NewText = [...links]
    NewText[index] = text

    setLinks(NewText)
  }

  const handleLinks = (index: number, value: string, syntax: syntaxEnum) => {
    const NewCodeErrors = [...linksError]
    NewCodeErrors[index] = value.length < 1
    setLinksError(NewCodeErrors)

    const text = syntax + value + ']'
    const NewText = [...links]
    NewText[index] = text

    setLinks(NewText)
  }

  const handleItalicsAndBold = (operator: string) => {
    const syntax = operator
    const texta = textaRef.current
    if (texta) {
      const text = texta.value
      const textStart = texta.selectionStart || 0
      const textEnd = texta.selectionEnd || 0
      const textSub = text.substring(textStart, textEnd)
      const isSelected = textSub !== ''

      if (isSelected) {
        const newText =
          text.substring(0, textStart) +
          syntax +
          text.substring(textStart, textEnd) +
          syntax +
          text.substring(textEnd)

        texta.value = newText
        texta.selectionStart = textStart + syntax.length
        texta.selectionEnd = textEnd + syntax.length
        setAdd(newText)
      }
      texta.focus()
    }
  }

  // Keyboard
  const handleEnter = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        handleSubmit
      } else if (e.key === 'Escape') {
        handleClose()
      }
    },
    [handleSave, handleClose],
  )

  useEffect(() => {
    inputRef.current?.focus()
    textaRef.current?.focus()
  }, [])

  useEffect(() => {
    if (
      form.title !== titleEnum.orderList &&
      form.title !== titleEnum.unorderList &&
      form.title !== titleEnum.code &&
      form.title !== titleEnum.inlineCode &&
      form.title !== titleEnum.images &&
      form.title !== titleEnum.links
    ) {
      inputRef.current?.focus()
    }

    window.addEventListener('keyup', handleEnter)
    return () => {
      window.removeEventListener('keyup', handleEnter)
    }
  }, [handleEnter])

  useEffect(() => {
    if (bottomPanel.current) bottomPanel.current.scrollIntoView()
  }, [AddInput])

  if (!isShow) return null

  // submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const hasErrors = inputErrors.some((error) => error)
    if (hasErrors) {
      alert('Por favor, completa todos los campos.')
      inputRef.current?.focus()
      return
    }

    handleSave()
    handleClose()
  }

  return (
    <div
      ref={popupRef}
      className={twMerge(
        isClosing ? 'form-pop-up-end-anim' : 'form-pop-up-start-anim',
        'fixed',
        'top-0 left-0 right-0 bottom-0',
        'h-full',
        'bg-neutral-600/50 backdrop-blur-lg',
        'flex justify-center items-center',
      )}
      style={{ zIndex: 99999999 }}
    >
      <div
        className={twMerge(
          'h-fit w-fit',
          'flex flex-col',
          'p-3 rounded-xl shadow-xl',
          'bg-slate-800 text-zinc-200',
          'shadow-xl',
          'max-h-[90vh] max-w-[90vw] min-w-fit',
        )}
      >
        <div className="flex flex-row justify-between">
          <div className="pb-3 text-5xl">{title}:</div>
          <CloseIcon
            onClick={handleClose}
            className={twMerge('h-fit w-fit', 'rounded-xl', 'bg-violet-600', 'cursor-pointer')}
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className={twMerge('overflow-hidden overflow-y-auto', 'flex flex-col')}
        >
          {
            // code
            form.title === titleEnum.code ? (
              <>
                <input
                  ref={inputRef}
                  className={twMerge(
                    'mt-4 mx-2',
                    'rounded-lg',
                    'w-[35rem]',
                    'h-20 text-neutral-900 text-5xl',
                  )}
                  type="text"
                  placeholder="Init"
                  onChange={(e) => handleInitCodeinput(0, e.target.value, syntax)}
                  required
                />
                {codeError[0] && (
                  <div className="mx-2 text-red-500 text-sm">Este campo es obligatorio</div>
                )}

                <textarea
                  className={twMerge(
                    'mt-4 mx-2',
                    'rounded-lg',
                    'w-[35rem]',
                    'h-20 text-neutral-900 text-5xl',
                    'resize-y',
                  )}
                  placeholder="Codigo"
                  onChange={(e) => handleCodeinput(1, e.target.value, syntax)}
                  required
                />
                {codeError[1] && (
                  <div className="mx-2 text-red-500 text-sm">Este campo es obligatorio</div>
                )}
              </>
            ) : // Links
            form.title === titleEnum.links ? (
              <>
                <input
                  ref={inputRef}
                  className={twMerge(
                    'mt-4 mx-2',
                    'rounded-lg',
                    'w-[35rem]',
                    'h-20 text-neutral-900 text-5xl',
                  )}
                  type="text"
                  placeholder="Nombre"
                  onChange={(e) => handleLinks(0, e.target.value, syntax)}
                  required
                />
                {linksError[0] && (
                  <div className="mx-2 text-red-500 text-sm">Este campo es obligatorio</div>
                )}

                <textarea
                  className={twMerge(
                    'mt-4 mx-2',
                    'rounded-lg',
                    'w-[35rem]',
                    'h-20 text-neutral-900 text-5xl',
                    'resize-y',
                  )}
                  placeholder="Enlace"
                  onChange={(e) => handleLinksinput(1, e.target.value)}
                  required
                />
                {linksError[1] && (
                  <div className="mx-2 text-red-500 text-sm">Este campo es obligatorio</div>
                )}
                <div ref={bottomPanel}></div>
              </>
            ) : // images
            form.title === titleEnum.images ? (
              <>
                <input
                  ref={inputRef}
                  className={twMerge(
                    'mt-4 mx-2',
                    'rounded-lg',
                    'w-[35rem]',
                    'h-20 text-neutral-900 text-5xl',
                  )}
                  type="text"
                  placeholder="Nombre"
                  onChange={(e) => handleImages(0, e.target.value, syntax)}
                  required
                />
                {imagesError[0] && (
                  <div className="mx-2 text-red-500 text-sm">Este campo es obligatorio</div>
                )}

                <textarea
                  className={twMerge(
                    'mt-4 mx-2',
                    'rounded-lg',
                    'w-[35rem]',
                    'h-20 text-neutral-900 text-5xl',
                    'resize-y',
                  )}
                  placeholder="Enlace"
                  onChange={(e) => handleImagesinput(1, e.target.value)}
                  required
                />
                {imagesError[1] && (
                  <div className="mx-2 text-red-500 text-sm">Este campo es obligatorio</div>
                )}
                <div ref={bottomPanel}></div>
              </>
            ) : (
              // nomrmal input
              <>
                {form.title === titleEnum.paragraph ? (
                  <>
                    <textarea
                      ref={textaRef}
                      className={twMerge(
                        'mt-4 mx-2 p-2',
                        'h-full min-h-16',
                        'w-[35rem] min-w-[35rem] max-w-[90vw]',
                        'rounded-lg',
                        'text-neutral-900',
                        'text-3xl resize',
                      )}
                      onChange={(e) => handleFirstInput(e.target.value, syntax)}
                      required
                    />
                  </>
                ) : (
                  <>
                    <input
                      ref={inputRef}
                      className={twMerge(
                        'mt-4 mx-2',
                        'rounded-lg',
                        'w-[35rem]',
                        'h-fit text-neutral-900',
                        'text-5xl',
                      )}
                      type="text"
                      onChange={(e) => handleFirstInput(e.target.value, syntax)}
                      required
                    />
                  </>
                )}
                {oneError && (
                  <div className="mx-2 text-red-500 text-sm">Este campo es obligatorio</div>
                )}
                {(form.title === titleEnum.orderList || form.title === titleEnum.unorderList) &&
                  AddInput > 0 &&
                  Array.from({ length: AddInput }).map((_, index) => (
                    <div key={`container-${index}`} className="relative">
                      <input
                        className={twMerge(
                          'mt-4 mx-2',
                          'rounded-lg',
                          'w-[35rem]',
                          'h-20 text-neutral-900',
                          'text-5xl',
                        )}
                        type="text"
                        onChange={(e) => handleChangeInputs(index, e.target.value, syntax)}
                        required
                      />
                      {inputErrors[index] && (
                        <div className="mx-2 text-red-500 text-sm">Este campo es obligatorio</div>
                      )}
                    </div>
                  ))}
                <div ref={bottomPanel}></div>
              </>
            )
          }

          <div
            className={twMerge(
              'pt-5',
              'h-32',
              'flex items-center flex-nowrap',
              form.title === titleEnum.orderList || form.title === titleEnum.unorderList
                ? 'justify-evenly'
                : 'justify-center',
            )}
          >
            <button
              type="submit"
              className={twMerge(
                'p-4 mx-auto rounded-lg',
                'text-4xl',
                'h-fit w-fit',
                'bg-violet-600',
              )}
            >
              Agregar
            </button>
            {(form.title === titleEnum.orderList || form.title === titleEnum.unorderList) && (
              <div className={twMerge('flex justify-center items-center')}>
                <button
                  type="button"
                  className={twMerge(
                    'p-4 mx-2 rounded-lg',
                    'text-2xl',
                    'h-fit w-fit',
                    'bg-green-500',
                  )}
                  onClick={() => setAddInput(() => AddInput + 1)}
                >
                  Agregar
                </button>
                <button
                  type="button"
                  className={twMerge(
                    'p-4 mx-2 rounded-lg',
                    'text-2xl',
                    'h-fit w-fit',
                    'bg-red-500',
                  )}
                  onClick={() => setAddInput(() => (AddInput > 0 ? AddInput - 1 : 0))}
                >
                  Eliminar
                </button>
              </div>
            )}
            {form.title === titleEnum.paragraph && (
              <div className={twMerge('flex justify-center items-center')}>
                <button
                  type="button"
                  className={twMerge(
                    'p-4 mx-2 rounded-lg',
                    'text-2xl',
                    'h-fit w-fit',
                    'bg-violet-800',
                  )}
                  onClick={() => handleItalicsAndBold('**')}
                >
                  Negritas
                </button>
                <button
                  type="button"
                  className={twMerge(
                    'p-4 mx-2 rounded-lg',
                    'text-2xl',
                    'h-fit w-fit',
                    'bg-violet-800',
                  )}
                  onClick={() => handleItalicsAndBold('*')}
                >
                  Cursivas
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
