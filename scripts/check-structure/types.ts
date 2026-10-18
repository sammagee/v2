import type { Program } from 'oxc-parser'

export interface Issue {
  file: string
  line: number
  message: string
}

export interface ImportRef {
  specifier: string
  line: number
}

export interface SourceFile {
  path: string
  program: Program
  imports: ImportRef[]
  lineAt: (offset: number) => number
}
