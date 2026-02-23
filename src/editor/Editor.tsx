import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { editorConfig } from './editorConfig'
import { InitialStatePlugin } from './plugins'
import './editor.css'

/**
 * Editor UI only: composes LexicalComposer with shared config and
 * plugins. No editor configuration or DOM manipulation here.
 */
export function Editor() {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-wrapper">
        <RichTextPlugin
          contentEditable={<ContentEditable className="editor-content" />}
          placeholder={null}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <InitialStatePlugin />
      </div>
    </LexicalComposer>
  )
}
