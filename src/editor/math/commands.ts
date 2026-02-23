import type { LexicalEditor } from 'lexical'
import { $insertNodes } from 'lexical'
import { $createMathNode } from './MathNode'

const DEFAULT_LATEX = 'E = mc^2'

/**
 * Insert an inline math node at the current selection.
 */
export function insertInlineMath(editor: LexicalEditor, latex?: string): void {
  editor.update(() => {
    const node = $createMathNode(latex ?? DEFAULT_LATEX, false)
    $insertNodes([node])
  })
}

/**
 * Insert a block math node at the current selection.
 */
export function insertBlockMath(editor: LexicalEditor, latex?: string): void {
  editor.update(() => {
    const node = $createMathNode(latex ?? DEFAULT_LATEX, true)
    $insertNodes([node])
  })
}
