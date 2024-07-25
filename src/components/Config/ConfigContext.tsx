import React, { createContext, useContext, useEffect, useState } from 'react'
import { ConfigBarPosition, LocalStorageVars, OptionsTitleEnum } from './utils'
import { useMDContext } from '../MDEditor'
import toast from 'react-hot-toast'
import { Toast, ToastCustomEnum } from '../ToastCustom'

interface ConfigContextType {
  showConfig: boolean
  setShowConfig: React.Dispatch<React.SetStateAction<boolean>>
  showTextArea: boolean
  setShowTextArea: React.Dispatch<React.SetStateAction<boolean>>
  saveLocalStorage: boolean
  setSaveLocalStorage: React.Dispatch<React.SetStateAction<boolean>>
  SaveDocument: boolean
  setSaveDocument: React.Dispatch<React.SetStateAction<boolean>>
  deleteData: boolean
  setDeleteData: React.Dispatch<React.SetStateAction<boolean>>
  optionTitle: OptionsTitleEnum
  setOptionTitle: React.Dispatch<React.SetStateAction<OptionsTitleEnum>>
  barPosition: ConfigBarPosition
  setBarPosition: React.Dispatch<React.SetStateAction<ConfigBarPosition>>
}

const defaulValue: ConfigContextType = {
  showConfig: false,
  setShowConfig: () => {},
  showTextArea: false,
  setShowTextArea: () => {},
  saveLocalStorage: true,
  setSaveLocalStorage: () => {},
  SaveDocument: true,
  setSaveDocument: () => {},
  deleteData: false,
  setDeleteData: () => {},
  optionTitle: OptionsTitleEnum.none,
  setOptionTitle: () => {},
  barPosition: ConfigBarPosition.top,
  setBarPosition: () => {},
}

const ConfigContext = createContext<ConfigContextType>(defaulValue)

export const useConfigContext = () => useContext(ConfigContext)

export const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const { mdValue, setMdValue } = useMDContext()
  const [showConfig, setShowConfig] = useState<boolean>(false)
  const [showTextArea, setShowTextArea] = useState<boolean>(false)
  const [deleteData, setDeleteData] = useState<boolean>(false)
  const [optionTitle, setOptionTitle] = useState<OptionsTitleEnum>(OptionsTitleEnum.none)
  const [barPosition, setBarPosition] = useState<ConfigBarPosition>(ConfigBarPosition.top)
  const [SaveDocument, setSaveDocument] = useState<boolean>(() => {
    const doc = localStorage.getItem(LocalStorageVars.document)
    if (doc) {
      return true
    }
    return false
  })
  const [saveConfig, setSaveConfig] = useState<{
    localStorage: boolean
    showMDText: boolean
    barMenuPosition: ConfigBarPosition
  }>(() => {
    const savedConfig = localStorage.getItem(LocalStorageVars.config)
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig)
        return {
          localStorage: parsedConfig.localStorage,
          barMenuPosition: parsedConfig.barMenuPosition,
          showMDText: parsedConfig.showMDText,
        }
      } catch (error) {
        localStorage.removeItem(LocalStorageVars.config)
      }
    }
    return {
      localStorage: true,
      showMDText: false,
      barMenuPosition: ConfigBarPosition.top,
    }
  })
  const [saveLocalStorage, setSaveLocalStorage] = useState<boolean>(() => {
    return saveConfig.localStorage
  })

  useEffect(() => {
    const doc = localStorage.getItem(LocalStorageVars.document)
    if (doc) {
      setMdValue(doc)
    }

    const savedConfig = localStorage.getItem(LocalStorageVars.config)
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig)
        setSaveLocalStorage(parsedConfig.localStorage)
        setShowTextArea(parsedConfig.showMDText)
        setBarPosition(parsedConfig.barMenuPosition)
      } catch (error) {
        localStorage.removeItem(LocalStorageVars.config)
      }
    }
  }, [])

  useEffect(() => {
    if (deleteData) {
      toast.custom(
        (t) => (
          <Toast
            t={t}
            title="Error"
            body="Esta desactivado el guardado en local"
            status={ToastCustomEnum.error}
          />
        ),
        { duration: 2000 },
      )
      setSaveLocalStorage(false)
      setSaveDocument(false)
      setBarPosition(barPosition)
      return
    }

    setSaveConfig(() => {
      if (saveLocalStorage) {
        return {
          localStorage: saveLocalStorage,
          barMenuPosition: barPosition,
          showMDText: showTextArea,
        }
      }
      return {
        localStorage: false,
        showMDText: false,
        barMenuPosition: ConfigBarPosition.top,
      }
    })
  }, [saveLocalStorage, showTextArea, barPosition, SaveDocument])

  useEffect(() => {
    if (deleteData) return

    localStorage.setItem(LocalStorageVars.config, JSON.stringify(saveConfig))
  }, [saveConfig, saveLocalStorage])

  useEffect(() => {
    if (!SaveDocument || deleteData) {
      localStorage.removeItem(LocalStorageVars.document)
      return
    }

    localStorage.setItem(LocalStorageVars.document, mdValue)
  }, [mdValue, SaveDocument])

  useEffect(() => {
    if (deleteData) {
      localStorage.clear()
      setSaveLocalStorage(false)
      setSaveDocument(false)
    }
  }, [deleteData])

  return (
    <ConfigContext.Provider
      value={{
        showConfig,
        setShowConfig,
        showTextArea,
        setShowTextArea,
        saveLocalStorage,
        SaveDocument,
        setSaveDocument,
        deleteData,
        setDeleteData,
        setSaveLocalStorage,
        optionTitle,
        setOptionTitle,
        barPosition,
        setBarPosition,
      }}
    >
      {children}
    </ConfigContext.Provider>
  )
}
