import { syntaxEnum } from '@renderer/components/FormPopUp'
import {
  BlockCode,
  BlockQuote1,
  BlockQuote2,
  Header1,
  Header2,
  Header3,
  Header4,
  Header5,
  Header6,
  Images,
  OrderList,
  Paragraph,
  UnOrderList,
} from '@renderer/components/MDEditor'
import React from 'react'

export const parseMarkdownToComponents = (text: string): React.ReactNode[] => {
  const lines = text.split(/\n\n|\n/).filter(Boolean)
  const components: React.ReactNode[] = []

  let OrderListItems: string[] = []
  let UnOrderListItems: string[] = []
  let BlockCodeItems: string[] = []
  let ReadingCode = false
  let codeLang = ''

  const flushLists = (index: number) => {
    if (OrderListItems.length > 0) {
      components.push(<OrderList key={`order-${index}`} items={OrderListItems} />)
      OrderListItems = []
    }
    if (UnOrderListItems.length > 0) {
      components.push(<UnOrderList key={`unorder-${index}`} items={UnOrderListItems} />)
      UnOrderListItems = []
    }
  }

  lines.forEach((line, index) => {
    if (ReadingCode) {
      if (line.startsWith(syntaxEnum.code)) {
        components.push(
          <BlockCode
            key={`code-${index}`}
            text={BlockCodeItems.slice(1).join('\n')}
            lang={codeLang}
          />,
        )
        BlockCodeItems = []
        ReadingCode = false
        return
      }
      BlockCodeItems.push(line)
      return
    }

    if (line.startsWith(syntaxEnum.code)) {
      flushLists(index)
      codeLang = line.substring(syntaxEnum.code.length).trim()
      BlockCodeItems.push(line)
      ReadingCode = true
      return
    }

    if (line.startsWith(syntaxEnum.blockQuote1) && !line.startsWith(syntaxEnum.blockQuote2)) {
      flushLists(index)
      components.push(<BlockQuote1 key={`BlockQuote1-${index}`} text={line} />)
      return
    }

    if (line.startsWith(syntaxEnum.blockQuote2)) {
      flushLists(index)
      components.push(<BlockQuote2 key={`BlockQuote2-${index}`} text={line} />)
      return
    }

    if (line.startsWith(syntaxEnum.images)) {
      flushLists(index)
      const match = line.match(/!\[([^\]]+)\]\(([^)]+)\)/)
      if (match) {
        const [, linkText, linkUrl] = match
        components.push(<Images key={`img-${index}`} text={linkText} links={linkUrl} />)
      }
      return
    }

    if (line.startsWith(syntaxEnum.header1)) {
      flushLists(index)
      components.push(<Header1 key={`header1-${index}`} text={line} />)
      return
    }

    if (line.startsWith(syntaxEnum.header2)) {
      flushLists(index)
      components.push(<Header2 key={`header2-${index}`} text={line} />)
      return
    }

    if (line.startsWith(syntaxEnum.header3)) {
      flushLists(index)
      components.push(<Header3 key={`header2-${index}`} text={line} />)
      return
    }

    if (line.startsWith(syntaxEnum.header4)) {
      flushLists(index)
      components.push(<Header4 key={`header2-${index}`} text={line} />)
      return
    }

    if (line.startsWith(syntaxEnum.header5)) {
      flushLists(index)
      components.push(<Header5 key={`header2-${index}`} text={line} />)
      return
    }

    if (line.startsWith(syntaxEnum.header6)) {
      flushLists(index)
      components.push(<Header6 key={`header2-${index}`} text={line} />)
      return
    }

    if (line.startsWith(syntaxEnum.orderList)) {
      OrderListItems.push(line)
      return
    }

    if (line.startsWith(syntaxEnum.unorderList)) {
      UnOrderListItems.push(line)
      return
    }

    flushLists(index)
    components.push(<Paragraph key={`paragraph-${index}`} text={line} />)
  })

  flushLists(lines.length)

  return components
}
