import { useEffect, useRef } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useEditorStore } from '@/store/editorStore'

const SERIALIZE_DEBOUNCE_MS = 400

/**
 * Syncs editor state to the editor store for persistence.
 * - On mount: if store has contentToHydrate, apply it to the editor and clear.
 * - On update: debounced write of serialized state to store (no component
 *   subscribes to that state, so no extra re-renders).
 */
export function EditorSyncPlugin() {
  const [editor] = useLexicalComposerContext()
  const setSerializedContent = useEditorStore((s) => s.setSerializedContent)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const contentToHydrate = useEditorStore.getState().consumeContentToHydrate()
    if (contentToHydrate) {
      try {
        const parsed = editor.parseEditorState(contentToHydrate)
        editor.setEditorState(parsed)
      } catch (e) {
        console.error('[EditorSyncPlugin] Failed to hydrate', e)
      }
    }
  }, [editor])

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => {
        const json = editorState.toJSON()
        setSerializedContent(JSON.stringify(json))
        debounceRef.current = null
      }, SERIALIZE_DEBOUNCE_MS)
    })
  }, [editor, setSerializedContent])

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  return null
}
