import React from 'react'
import { BlockQuotes, Code, Headers, Links, OrderLists, Paragraph } from '../Options'

export enum GroupButtonTitleEnum {
  none = '',

  headers = 'Titulos',
  quotes = 'Citas',
  lists = 'Listas',
  code = 'Codigo',
  links = 'Enlaces',
  paragraph = 'Parrafos',
}

export const ModeComponent = {
  headers: Headers,
  blockquotes: BlockQuotes,
  orderLists: OrderLists,
  code: Code,
  links: Links,
  paragraph: Paragraph,
}

export interface GroupButtonsProps {
  name: string
  mode: React.ComponentType
}
