import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { $getRoot, $createParagraphNode } from 'lexical'
import type { InitialConfigType } from '@lexical/react/LexicalComposer'
import { editorTheme } from './theme'
import './editor.css'

const initialConfig: InitialConfigType = {
  namespace: 'QuantusEditor',
  theme: editorTheme,
  onError: (error) => console.error(error),
  editorState: () => {
    const root = $getRoot()
    if (root.getFirstChild() === null) {
      const paragraph = $createParagraphNode()
      root.append(paragraph)
    }
  },
}

export function Editor() {
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-wrapper">
        <RichTextPlugin
          contentEditable={<ContentEditable className="editor-content" />}
          placeholder={null}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
      </div>
    </LexicalComposer>
  )
}
