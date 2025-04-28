declare module '@barelyhuman/astring-jsx' {
  import type { Node, Options, Writable } from 'astring'

  export function generate(node: Node, options?: Options<null>): string
  export function generate(node: Node, options?: Options<Writable>): Writable
}
