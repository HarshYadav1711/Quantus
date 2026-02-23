import { useEffect } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getSelection, $isRangeSelection } from 'lexical'
import { useUIStore } from '@/store/uiStore'

/**
 * Pushes selection format (bold, italic, underline, code) into the UI store
 * so the toolbar can reflect current selection. Only updates store when
 * selection is a range; otherwise resets format. No DOM manipulation.
 */
export function SelectionFormatPlugin() {
  const [editor] = useLexicalComposerContext()
  const setFormat = useUIStore((s) => s.setFormat)
  const resetFormat = useUIStore((s) => s.resetFormat)

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection()
        if (!$isRangeSelection(selection)) {
          resetFormat()
          return
        }
        setFormat({
          bold: selection.hasFormat('bold'),
          italic: selection.hasFormat('italic'),
          underline: selection.hasFormat('underline'),
          code: selection.hasFormat('code'),
        })
      })
    })
  }, [editor, setFormat, resetFormat])

  return null
}
