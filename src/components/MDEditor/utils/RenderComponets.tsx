import { syntaxEnum } from '@renderer/components/FormPopUp'

interface ComponentsProps {
  text?: string
  lang?: string
  links?: string
}

export const Header1 = ({ text }: ComponentsProps) => {
  const renderText = text?.substring(syntaxEnum.header1.length)

  return (
    <h1 className="text-7xl font-bold py-3 my-2" id={renderText}>
      {renderText} <hr className="border-neutral-500/50 mt-5" />
    </h1>
  )
}

export const Header2 = ({ text }: ComponentsProps) => {
  const renderText = text?.substring(syntaxEnum.header2.length)

  return (
    <h2 className="text-6xl font-bold py-3 my-2" id={renderText}>
      {renderText} <hr className="border-neutral-500/50 mt-5" />
    </h2>
  )
}

export const Header3 = ({ text }: ComponentsProps) => {
  const renderText = text?.substring(syntaxEnum.header3.length)

  return (
    <h3 className="text-5xl font-bold py-3 my-2" id={renderText}>
      {renderText} <hr className="border-neutral-500/50 mt-5" />
    </h3>
  )
}

export const Header4 = ({ text }: ComponentsProps) => {
  const renderText = text?.substring(syntaxEnum.header4.length)

  return (
    <h4 className="text-4xl font-bold py-3 my-2" id={renderText}>
      {renderText} <hr className="border-neutral-500/50 mt-5" />
    </h4>
  )
}

export const Header5 = ({ text }: ComponentsProps) => {
  const renderText = text?.substring(syntaxEnum.header5.length)

  return (
    <h5 className="text-3xl font-bold py-3 my-2" id={renderText}>
      {renderText} <hr className="border-neutral-500/50 mt-5" />
    </h5>
  )
}

export const Header6 = ({ text }: ComponentsProps) => {
  const renderText = text?.substring(syntaxEnum.header6.length)

  return (
    <h6 className="text-2xl font-bold py-3 my-2" id={renderText}>
      {renderText} <hr className="border-neutral-500/50 mt-5" />
    </h6>
  )
}

export const BlockQuote1 = ({ text }: ComponentsProps) => {
  const renderText = text?.substring(syntaxEnum.blockQuote1.length)

  return <blockquote className="pl-4 border-l-4 border-gray-400">{renderText}</blockquote>
}

export const BlockQuote2 = ({ text }: ComponentsProps) => {
  const renderText = text?.substring(syntaxEnum.blockQuote2.length)

  return (
    <blockquote className="pl-4 border-l-4 border-gray-400">
      <blockquote className="pl-4 border-l-4 border-gray-400">{renderText}</blockquote>
    </blockquote>
  )
}

export const OrderList = ({ items }: { items: string[] }) => {
  return (
    <ol className="list-decimal pl-12">
      {items.map((item, index) => (
        <li key={index} className="order">
          {processText(item.substring(syntaxEnum.orderList.length))}
        </li>
      ))}
    </ol>
  )
}

export const UnOrderList = ({ items }: { items: string[] }) => {
  return (
    <ul className="list-disc pl-12">
      {items.map((item, index) => (
        <li key={index} className="no-order">
          {processText(item.substring(syntaxEnum.unorderList.length))}
        </li>
      ))}
    </ul>
  )
}

export const BlockCode = ({ text, lang }: ComponentsProps) => {
  return (
    <div className={`bg-gray-800 p-2 rounded w-fit lang-${lang}`}>
      <pre>{text}</pre>
    </div>
  )
}

export const Links = ({ text, links }: ComponentsProps) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()

    if (links) {
      window.open(links)
    }
  }

  return (
    <a href={links} onClick={(e) => handleLinkClick(e)} className="text-blue-500 underline">
      {text}
    </a>
  )
}

export const Images = ({ text, links }: ComponentsProps) => {
  return (
    <p className="p-1">
      <img className="my-2" src={links} alt={text} />
    </p>
  )
}

export const LineCode = ({ text }: ComponentsProps) => {
  return <code className="bg-gray-700 p-1 rounded">{text}</code>
}

export const BoldLetters = ({ text }: ComponentsProps) => {
  return <strong>{text}</strong>
}

export const ItalicsLetters = ({ text }: ComponentsProps) => {
  return <em>{text}</em>
}

export const ItalicsBoldLetters = ({ text }: ComponentsProps) => {
  return (
    <strong>
      <em>{text}</em>
    </strong>
  )
}

export const Paragraph = ({ text }: ComponentsProps) => {
  if (!text) return null

  let renderedParts: (string | JSX.Element)[] = []

  const matches = text.match(
    /\[([^\]]+)\]\(([^)]+)\)|(\s+\+\s+)|(`[^`]+`|\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*)/g,
  )

  if (!matches) {
    return <p className="p-1">{text}</p>
  }

  let lastIndex = 0
  matches.forEach((match, index) => {
    const startIndex = text.indexOf(match, lastIndex)
    const beforeMatch = text.slice(lastIndex, startIndex)

    if (beforeMatch) {
      renderedParts.push(beforeMatch)
    }

    if (match.startsWith('[')) {
      const parts = match.match(/\[([^\]]+)\]\(([^)]+)\)/)
      if (parts) {
        renderedParts.push(
          <Links key={`link-${parts[1]}-${index}`} text={parts[1]} links={parts[2]} />,
        )
      }
    } else if (match.startsWith('`') && match.endsWith('`')) {
      renderedParts.push(<LineCode key={`code-${index}`} text={match.slice(1, -1)} />)
    } else if (match.startsWith('***') && match.endsWith('***')) {
      renderedParts.push(
        <ItalicsBoldLetters key={`italics-bold-${index}`} text={match.slice(3, -3)} />,
      )
    } else if (match.startsWith('**') && match.endsWith('**')) {
      renderedParts.push(<BoldLetters key={`bold-${index}`} text={match.slice(2, -2)} />)
    } else if (match.startsWith('*') && match.endsWith('*')) {
      renderedParts.push(<ItalicsLetters key={`italics-${index}`} text={match.slice(1, -1)} />)
    } else {
      renderedParts.push(match)
    }

    lastIndex = startIndex + match.length
  })

  if (lastIndex < text.length) {
    renderedParts.push(text.slice(lastIndex))
  }

  return <p className="p-1">{renderedParts}</p>
}

const processText = (text: string) => {
  const matches = text.match(
    /\[([^\]]+)\]\(([^)]+)\)|(`[^`]+`|\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*)/g,
  )
  if (!matches) return text

  let renderedParts: (string | JSX.Element)[] = []
  let lastIndex = 0

  matches.forEach((match, index) => {
    const startIndex = text.indexOf(match, lastIndex)
    const beforeMatch = text.slice(lastIndex, startIndex)

    if (beforeMatch) {
      renderedParts.push(beforeMatch)
    }

    if (match.startsWith('[')) {
      const parts = match.match(/\[([^\]]+)\]\(([^)]+)\)/)
      if (parts) {
        renderedParts.push(
          <Links key={`link-${parts[1]}-${index}`} text={parts[1]} links={parts[2]} />,
        )
      }
    } else if (match.startsWith('`') && match.endsWith('`')) {
      renderedParts.push(<LineCode key={`code-${index}`} text={match.slice(1, -1)} />)
    } else if (match.startsWith('***') && match.endsWith('***')) {
      renderedParts.push(
        <ItalicsBoldLetters key={`italics-bold-${index}`} text={match.slice(3, -3)} />,
      )
    } else if (match.startsWith('**') && match.endsWith('**')) {
      renderedParts.push(<BoldLetters key={`bold-${index}`} text={match.slice(2, -2)} />)
    } else if (match.startsWith('*') && match.endsWith('*')) {
      renderedParts.push(<ItalicsLetters key={`italics-${index}`} text={match.slice(1, -1)} />)
    } else {
      renderedParts.push(match)
    }

    lastIndex = startIndex + match.length
  })

  if (lastIndex < text.length) {
    renderedParts.push(text.slice(lastIndex))
  }

  return renderedParts
}
