import React, { useEffect, useState } from 'react'
import { MarkdownRendererProps } from '.'
import { parseMarkdownToComponents } from './ParseMarkDowntoComponent'
import { useMDContext } from '../MDContext'

export const MarkdownRenderer = ({ markdownText, className }: MarkdownRendererProps) => {
  const { mdValue } = useMDContext()
  const [components, setComponents] = useState<React.ReactNode[]>([])

  useEffect(() => {
    setComponents(parseMarkdownToComponents(markdownText))
  }, [mdValue])

  return <div className={className}>{components}</div>
}
