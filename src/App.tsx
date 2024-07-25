import { twMerge } from 'tailwind-merge'
import {
  Config,
  ConfigBarPosition,
  MDEditor,
  Nav,
  TitleBar,
  Tools,
  useAppContext,
  useConfigContext,
} from './components'
import { Toaster } from 'react-hot-toast'

function App(): JSX.Element {
  const { sizeWindow, limitsWindow } = useAppContext()
  const { barPosition } = useConfigContext()

  return (
    <>
      <TitleBar />
      <Nav />
      <Tools />
      <div
        className={twMerge(
          sizeWindow.width < limitsWindow.minWidth
            ? barPosition === ConfigBarPosition.left
              ? 'pt-10 pb-10 pl-24 pr-10'
              : barPosition === ConfigBarPosition.right
                ? 'pt-10 pb-10 pl-10 pr-24'
                : barPosition === ConfigBarPosition.bottom
                  ? 'pt-10 pb-20 pl-10 pr-10'
                  : 'pt-20 pb-10 pl-10 pr-10'
            : barPosition === ConfigBarPosition.left
              ? 'pt-20 pb-10 pl-52 pr-10'
              : barPosition === ConfigBarPosition.right
                ? 'pt-20 pb-10 pl-10 pr-52'
                : barPosition === ConfigBarPosition.bottom
                  ? 'pt-20 pb-48 pl-10 pr-10'
                  : 'pt-60 pb-10 pl-10 pr-10',
          'text-base',
          'h-screen max-h-screen min-h-svh w-full',
          'overflow-hidden',
          'bg-slate-950 text-white ',
          'flex flex-col justify-center',
          'items-center',
        )}
      >
        <MDEditor />
      </div>
      <Config />
      <Toaster position="top-center" />
    </>
  )
}

export default App
