import { getMDXComponent } from 'mdx-bundler/client'
import { createElement, useMemo, type ComponentProps } from 'react'

type MdxComponents = ComponentProps<
  ReturnType<typeof getMDXComponent>
>['components']

export function useMdxContent(code: string, components: MdxComponents) {
  return useMemo(
    () => createElement(getMDXComponent(code), { components }),
    [code, components]
  )
}
