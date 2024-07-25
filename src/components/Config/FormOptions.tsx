import { twMerge } from 'tailwind-merge'
import { ConfigBarPosition, FormsOptionsProps, OptionsTitleEnum } from './utils'
import { AppDescription } from './AppDescription'
import {
  BarPositionBottomIcon,
  BarPositionRightIcon,
  BarPositionLeftIcon,
  BarPositionTopIcon,
} from '../Icons'
import { useConfigContext } from './ConfigContext'

export const FormOptions = ({ title }: FormsOptionsProps) => {
  const {
    saveLocalStorage,
    setSaveLocalStorage,
    optionTitle,
    showTextArea,
    setShowTextArea,
    barPosition,
    setBarPosition,
    SaveDocument,
    setSaveDocument,
    deleteData,
    setDeleteData,
  } = useConfigContext()
  return (
    <>
      {optionTitle === OptionsTitleEnum.save && (
        // Save
        <div
          className={twMerge(
            'h-full w-full p-5',
            'rounded-3xl',
            'flex justify-center items-center overflow-hidden',
            'bg-slate-800',
          )}
        >
          <div className={twMerge('w-full h-full', 'flex flex-col', 'text-4xl text-zinc-200')}>
            <span className={twMerge('w-full h-fit', 'text-center')}>{OptionsTitleEnum.save}</span>
            <hr className="my-5" />
            <div className="h-full w-full overflow-y-auto bg-transparent">
              <div className={twMerge('w-full h-fit', 'flex flex-row items-center')}>
                <div
                  className={twMerge(
                    'w-full h-fit my-2 flex-col',
                    'p-2 rounded-xl',
                    'bg-slate-700',
                    'flex justify-center items-center',
                  )}
                >
                  <span>Guardar configuracion</span>
                  <hr className="my-5" />
                  <input
                    type="checkbox"
                    className={twMerge('hidden peer', 'rounded')}
                    checked={saveLocalStorage}
                    readOnly
                  />
                  <label
                    className={twMerge(
                      'flex justify-center items-center',
                      'p-5 w-fit',
                      'rounded-xl',
                      'bg-gray-800',
                      'text-zinc-200',
                      'border-2 border-gray-600',
                      'peer-checked:border-blue-600',
                    )}
                    onClick={() => setSaveLocalStorage(!saveLocalStorage)}
                  >
                    Local Storage
                  </label>
                </div>
              </div>

              <div className={twMerge('w-full h-fit', 'flex flex-row items-center')}>
                <div
                  className={twMerge(
                    'w-full h-fit my-2 flex-col',
                    'p-2 rounded-xl',
                    'bg-slate-700',
                    'flex justify-center items-center',
                  )}
                >
                  <span>Guardar documento</span>
                  <hr className="my-5" />
                  <input
                    type="checkbox"
                    className={twMerge('hidden peer', 'rounded')}
                    checked={SaveDocument}
                    readOnly
                  />
                  <label
                    className={twMerge(
                      'flex justify-center items-center',
                      'p-5 w-fit',
                      'rounded-xl',
                      'bg-gray-800',
                      'text-zinc-200',
                      'border-2 border-gray-600',
                      'peer-checked:border-blue-600',
                    )}
                    onClick={() => setSaveDocument(!SaveDocument)}
                  >
                    Guardar MarkDown
                  </label>
                </div>
              </div>

              <div className={twMerge('w-full h-fit', 'flex flex-row items-center')}>
                <div
                  className={twMerge(
                    'w-full h-fit my-2 flex-col',
                    'p-2 rounded-xl',
                    'bg-red-950',
                    'flex justify-center items-center',
                  )}
                >
                  <span>Eliminar datos</span>
                  <hr className="my-5" />
                  <input
                    type="checkbox"
                    className={twMerge('hidden peer', 'rounded')}
                    checked={deleteData}
                    readOnly
                  />
                  <label
                    className={twMerge(
                      'flex justify-center items-center',
                      'p-5 w-fit',
                      'rounded-xl',
                      'bg-red-600',
                      'text-zinc-200',
                      'border-2 border-red-800',
                      'peer-checked:border-green-600',
                    )}
                    onClick={() => setDeleteData(!deleteData)}
                  >
                    Eliminar Datos
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {optionTitle === OptionsTitleEnum.about && (
        // About
        <div
          className={twMerge(
            'h-full w-full p-5',
            'rounded-3xl',
            'flex flex-col justify-center items-center',
            'bg-slate-800',
            'overflow-hidden',
          )}
        >
          <div className={twMerge('w-full h-full', 'flex flex-col', 'text-4xl text-zinc-200')}>
            <span className={twMerge('w-full h-fit', 'text-center')}>{title}</span>
            <hr className="my-5" />
            <div className="flex-1 p-4 leading-relaxed overflow-auto">
              <AppDescription />
            </div>
          </div>
        </div>
      )}

      {optionTitle === OptionsTitleEnum.editor && (
        // Editor
        <div
          className={twMerge(
            'h-full w-full p-5',
            'rounded-3xl',
            'flex flex-col justify-center items-center',
            'bg-slate-800',
            'overflow-hidden',
          )}
        >
          <div
            className={twMerge(
              'w-full h-full',
              'overflow-y-auto',
              'flex flex-col',
              'text-4xl text-zinc-200',
            )}
          >
            <span className={twMerge('w-full h-fit', 'text-center')}>{title}</span>
            <hr className="my-5" />

            <div className="h-full w-full overflow-y-auto bg-transparent">
              <div
                className={twMerge(
                  'w-full h-fit my-2 flex-col',
                  'p-2 rounded-xl',
                  'bg-slate-700',
                  'flex justify-center items-center',
                )}
              >
                <span>Mostar texto Mark Down</span>
                <hr className="my-5" />
                <input
                  type="checkbox"
                  className="hidden peer"
                  checked={showTextArea}
                  readOnly
                  required
                />
                <label
                  htmlFor={ConfigBarPosition.top}
                  className={twMerge(
                    'flex justify-center items-center',
                    'p-5 w-fit',
                    'rounded-xl',
                    'bg-gray-800',
                    'text-zinc-200',
                    'border-2 border-gray-600',
                    'peer-checked:border-blue-600',
                  )}
                  onClick={() => setShowTextArea(!showTextArea)}
                >
                  Motrar texto MD
                </label>
              </div>

              <div
                className={twMerge(
                  'w-full h-fit my-2',
                  'p-2 rounded-xl',
                  'bg-slate-700',
                  'flex flex-col items-center',
                )}
              >
                <span>Posision de menu de herramientas</span>
                <hr className="my-5" />
                <ul className="w-full flex flex-wrap justify-evenly">
                  <li>
                    <input
                      type="radio"
                      id={ConfigBarPosition.top}
                      name="barPosition"
                      className="hidden peer"
                      checked={barPosition === ConfigBarPosition.top}
                      readOnly
                      required
                    />
                    <label
                      htmlFor={ConfigBarPosition.top}
                      className={twMerge(
                        'inline-flex justify-between',
                        'p-5 w-fit',
                        'rounded-xl',
                        'bg-gray-800',
                        'text-zinc-200',
                        'border-2 border-gray-600',
                        'peer-checked:border-blue-600',
                      )}
                      onClick={() => setBarPosition(ConfigBarPosition.top)}
                    >
                      <div className="flex justify-center items-center flex-col">
                        <span className="text-4xl mb-5">{ConfigBarPosition.top}</span>
                        <BarPositionTopIcon />
                      </div>
                    </label>
                  </li>

                  <li>
                    <input
                      type="radio"
                      id={ConfigBarPosition.left}
                      name="barPosition"
                      className="hidden peer"
                      checked={barPosition === ConfigBarPosition.left}
                      readOnly
                      required
                    />
                    <label
                      htmlFor={ConfigBarPosition.left}
                      className={twMerge(
                        'inline-flex justify-between',
                        'p-5 w-fit',
                        'rounded-xl',
                        'bg-gray-800',
                        'text-zinc-200',
                        'border-2 border-gray-600',
                        'peer-checked:border-blue-600',
                      )}
                      onClick={() => setBarPosition(ConfigBarPosition.left)}
                    >
                      <div className="flex justify-center items-center flex-col">
                        <span className="text-4xl mb-5">{ConfigBarPosition.left}</span>
                        <BarPositionLeftIcon />
                      </div>
                    </label>
                  </li>

                  <li>
                    <input
                      type="radio"
                      id={ConfigBarPosition.bottom}
                      name="barPosition"
                      className="hidden peer"
                      checked={barPosition === ConfigBarPosition.bottom}
                      readOnly
                      required
                    />
                    <label
                      htmlFor={ConfigBarPosition.bottom}
                      className={twMerge(
                        'inline-flex justify-between',
                        'p-5 w-fit',
                        'rounded-xl',
                        'bg-gray-800',
                        'text-zinc-200',
                        'border-2 border-gray-600',
                        'peer-checked:border-blue-600',
                      )}
                      onClick={() => setBarPosition(ConfigBarPosition.bottom)}
                    >
                      <div className="flex justify-center items-center flex-col">
                        <span className="text-4xl mb-5">{ConfigBarPosition.bottom}</span>
                        <BarPositionBottomIcon />
                      </div>
                    </label>
                  </li>

                  <li>
                    <input
                      type="radio"
                      id={ConfigBarPosition.right}
                      name="barPosition"
                      className="hidden peer"
                      checked={barPosition === ConfigBarPosition.right}
                      readOnly
                      required
                    />
                    <label
                      htmlFor={ConfigBarPosition.right}
                      className={twMerge(
                        'inline-flex justify-between',
                        'p-5 w-fit',
                        'rounded-xl',
                        'bg-gray-800',
                        'text-zinc-200',
                        'border-2 border-gray-600',
                        'peer-checked:border-blue-600',
                      )}
                      onClick={() => setBarPosition(ConfigBarPosition.right)}
                    >
                      <div className="flex justify-center items-center flex-col">
                        <span className="text-4xl mb-5">{ConfigBarPosition.right}</span>
                        <BarPositionRightIcon />
                      </div>
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
