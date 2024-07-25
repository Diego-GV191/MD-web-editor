import React, { createContext, useContext, useEffect, useState } from 'react'

interface AppContextType {
  sizeWindow: {
    width: number
    height: number
  }
  setSizeWindow: React.Dispatch<
    React.SetStateAction<{
      width: number
      height: number
    }>
  >
  limitsWindow: {
    minWidth: number
    minHeight: number
  }
  setLimitsWindow: React.Dispatch<
    React.SetStateAction<{
      minWidth: number
      minHeight: number
    }>
  >
}

const defaultValue: AppContextType = {
  sizeWindow: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  setSizeWindow: () => {},
  limitsWindow: {
    minWidth: 1200,
    minHeight: 0,
  },
  setLimitsWindow: () => {},
}

const AppContext = createContext<AppContextType>(defaultValue)

export const useAppContext = () => useContext(AppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [limitsWindow, setLimitsWindow] = useState<{ minWidth: number; minHeight: number }>({
    minWidth: 1200,
    minHeight: 0,
  })
  const [sizeWindow, setSizeWindow] = useState<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = () => {
      setSizeWindow({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return (
    <AppContext.Provider value={{ sizeWindow, setSizeWindow, limitsWindow, setLimitsWindow }}>
      {children}
    </AppContext.Provider>
  )
}
