export interface OptionsProps {
  title: string
  onClick?: () => void
}

export interface ConfigProps {
  className?: string
}

export interface FormsOptionsProps {
  title: OptionsTitleEnum
}

export enum OptionsTitleEnum {
  none = '',

  save = 'Guardar',
  about = 'Sobre la aplicación',
  editor = 'Editor',
}

export enum ConfigBarPosition {
  left = 'Left',
  right = 'Right',
  top = 'Top',
  bottom = 'Bottom',
}

export enum LocalStorageVars {
  config = 'Config',
  document = 'DocMD',
}
