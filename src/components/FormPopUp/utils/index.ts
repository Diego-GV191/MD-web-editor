export enum syntaxEnum {
  none = '',

  header1 = '# ',
  header2 = '## ',
  header3 = '### ',
  header4 = '#### ',
  header5 = '##### ',
  header6 = '###### ',

  blockQuote1 = '> ',
  blockQuote2 = '> > ',

  orderList = '1. ',
  unorderList = '- ',

  code = '```',
  inlineCode = '`',

  links = '[',
  images = '![',

  paragraph = '\n',
}

export enum titleEnum {
  none = '',

  header1 = 'Encabezado 1',
  header2 = 'Encabezado 2',
  header3 = 'Encabezado 3',
  header4 = 'Encabezado 4',
  header5 = 'Encabezado 5',
  header6 = 'Encabezado 6',

  blockQuote1 = 'Cita',
  blockQuote2 = 'Cita doble',

  orderList = 'Listas ordenadas',
  unorderList = 'Listas desordenadas',

  code = 'Bloque de codigo',
  inlineCode = 'Codigo en linea',

  links = 'Enlaces',
  images = 'Imagenes',

  paragraph = 'Parrafos',
}

export interface FormPopUpProps {
  title: titleEnum
  syntax: syntaxEnum
}
