import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { FORMAT_TEXT_COMMAND } from 'lexical'
import type { TextFormatType } from 'lexical'
import { insertTable } from '@/editor/table'
import { useUIStore, type ToolbarFormat } from '@/store'

const FORMATS: { key: keyof ToolbarFormat; label: string }[] = [
  { key: 'bold', label: 'B' },
  { key: 'italic', label: 'I' },
  { key: 'underline', label: 'U' },
  { key: 'code', label: 'Code' },
]

/**
 * Toolbar that reflects selection format from the UI store and dispatches
 * format commands to the editor. Subscribes only to format slice to minimize re-renders.
 */
export function EditorToolbar() {
  const [editor] = useLexicalComposerContext()
  const format = useUIStore((s) => s.format)

  return (
    <div className="editor-toolbar" role="toolbar">
      {FORMATS.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          aria-pressed={format[key] ? 'true' : 'false'}
          onClick={() =>
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, key as TextFormatType)
          }
        >
          {label}
        </button>
      ))}
      <span className="editor-toolbar-separator" aria-hidden />
      <button
        type="button"
        onClick={() => insertTable(editor)}
        title="Insert table"
      >
        Table
      </button>
    </div>
  )
}
