import React, { useEffect, useRef, useState } from 'react'
import { useMDContext } from './MDContext'
import { twMerge } from 'tailwind-merge'
import { useConfigContext } from '../Config'
import { MarkdownRenderer } from './ParseMarkDown'

export const MDEditor = () => {
  const { mdValue, setMdValue } = useMDContext()
  const { showTextArea } = useConfigContext()
  const [dragAndDrop, setDragAndDrop] = useState<boolean>(false)
  const [htmlValue, setHtmlValue] = useState<string>('')
  const mdValueRef = useRef(mdValue)
  const bottomOfPanelRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const divRef = useRef<HTMLDivElement>(null)
  const [divPosition, setDivPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  })

  useEffect(() => {
    const handleInput = (e: Event) => {
      const target = e.target as HTMLTextAreaElement
      setMdValue(target.value)
    }

    const textarea = inputRef.current
    if (!textarea) return

    textarea.addEventListener('input', handleInput)
    return () => {
      textarea.removeEventListener('input', handleInput)
    }
  }, [])

  useEffect(() => {
    const rect = divRef.current?.getBoundingClientRect()
    if (!rect) return
    setDivPosition({ top: rect.top, left: rect.left })
  }, [])

  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'n') {
        setMdValue('')
        return
      } else if (e.ctrlKey && e.key === 's') {
        saveMarkdown()
        return
      }
    }

    const handleFocus = () => {
      inputRef.current?.focus()
    }

    window.addEventListener('keydown', handleKeys)
    window.addEventListener('focus', handleFocus)
    return () => {
      window.removeEventListener('keydown', handleKeys)
      window.removeEventListener('focus', handleFocus)
    }
  }, [])

  useEffect(() => {
    setHtmlValue(mdValue)
    mdValueRef.current = mdValue
  }, [mdValue])

  useEffect(() => {
    if (bottomOfPanelRef.current) {
      bottomOfPanelRef.current.scrollIntoView()
    }

    if (divRef.current) {
      divRef.current.scrollIntoView()
    }
  }, [htmlValue])

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const items = e.dataTransfer.items
    if (items) {
      if (items[0].kind === 'file') {
        const file = items[0].getAsFile()
        if (file) {
          const reader = new FileReader()
          reader.onload = (event) => {
            const text = event.target?.result
            if (typeof text === 'string') {
              setMdValue(text)
            }
          }
          reader.readAsText(file)
        }
      }
    }
    setDragAndDrop(false)
  }

  const saveMarkdown = () => {
    const blob = new Blob([mdValueRef.current], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'document.md'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <>
      {dragAndDrop && (
        <div
          onDrop={(e) => handleDrop(e)}
          onDragOver={(e) => e.preventDefault()}
          className={twMerge(
            'top-0 right-0',
            'h-full w-full absolute',
            'bg-gray-600/50 backdrop-blur',
            'animate-pulse',
          )}
        ></div>
      )}
      <article
        onDragEnter={() => setDragAndDrop(true)}
        className={twMerge(
          'bg-slate-900',
          'h-screen min-w-full p-4',
          ' overflow-y-auto scroll-smooth select-none cursor-text',
          showTextArea ? 'flex flex-row' : '',
        )}
        style={{ fontSize: '24px' }}
        onClick={() => inputRef.current?.focus()}
      >
        <textarea
          ref={inputRef}
          value={mdValue}
          onChange={(e) => setMdValue(e.target.value)}
          className={twMerge(
            showTextArea
              ? 'border-2 border-zinc-500 p-4 opacity-100 h-full mr-5 overflow-y-auto'
              : 'opacity-0 h-fit overflow-hidden',
            'outline-none',
            'bg-transparent',
          )}
          style={{
            position: showTextArea ? undefined : 'absolute',
            lineHeight: 1.5,
            resize: 'none',
            width: showTextArea ? '50%' : '1px',
            top: `${divPosition.top}px`,
            left: `${divPosition.left}px`,
          }}
        />
        <MarkdownRenderer
          markdownText={mdValue}
          className={twMerge(
            showTextArea ? 'w-[50%] overflow-y-auto' : 'w-full',
            'space-y-1',
            'select-all',
          )}
        />
        <div ref={bottomOfPanelRef}></div>
      </article>
    </>
  )
}
