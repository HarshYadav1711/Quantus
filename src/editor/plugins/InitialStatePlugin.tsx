import { useEffect } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getRoot } from 'lexical'

/**
 * Plugin that uses the editor instance (from context) and EditorState.
 * No DOM manipulation: state is read via Lexical's read-only API ($getRoot, etc.).
 * Demonstrates plugin-based architecture: subscribe to updates and read state
 * inside editorState.read().
 */
export function InitialStatePlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const root = $getRoot()
        // Read-only access to the editor state. Use root.getChildren(),
        // $getSelection(), etc. for persistence or validation.
        void root.getChildren()
      })
    })
  }, [editor])

  return null
}
