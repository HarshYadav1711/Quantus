import {
  $getRoot,
  $createParagraphNode,
  type LexicalEditor,
  RootNode,
  ParagraphNode,
  TextNode,
  LineBreakNode,
  TabNode,
} from 'lexical'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table'
import type { InitialConfigType } from '@lexical/react/LexicalComposer'
import { editorTheme } from './theme'

/**
 * Initial editor state: empty root with a single paragraph.
 * Runs inside the editor instance; no DOM access.
 */
function createInitialEditorState(_editor: LexicalEditor): void {
  const root = $getRoot()
  if (root.getFirstChild() === null) {
    root.append($createParagraphNode())
  }
}

/**
 * Nodes registered with the editor. Rich-text block and inline nodes
 * used for basic editing. Registration is explicit in config so the
 * editor instance knows all node types up front.
 */
const editorNodes = [
  RootNode,
  ParagraphNode,
  TextNode,
  LineBreakNode,
  TabNode,
  HeadingNode,
  QuoteNode,
  TableNode,
  TableRowNode,
  TableCellNode,
]

/**
 * Editor configuration: namespace, theme, error handling, nodes, and
 * initial state. Kept separate from UI so the same config can be
 * reused (e.g. headless or tests) and so the editor instance is
 * defined in one place.
 */
export const editorConfig: InitialConfigType = {
  namespace: 'QuantusEditor',
  theme: editorTheme,
  onError: (error: Error, editor: LexicalEditor) => {
    console.error('[Lexical]', error, editor.getKey())
  },
  nodes: editorNodes,
  editorState: createInitialEditorState,
}
