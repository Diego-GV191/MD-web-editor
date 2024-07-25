import React, { createContext, SetStateAction, useContext, useState } from 'react'

interface MDContextType {
  mdValue: string
  setMdValue: React.Dispatch<SetStateAction<string>>
}

const defaultValue: MDContextType = {
  mdValue: '',
  setMdValue: () => {},
}

const MDContext = createContext<MDContextType>(defaultValue)

export const useMDContext = () => useContext(MDContext)

export const MDProvider = ({ children }: { children: React.ReactNode }) => {
  const [mdValue, setMdValue] = useState<string>('')

  return <MDContext.Provider value={{ mdValue, setMdValue }}>{children}</MDContext.Provider>
}
