import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  applyFormat,
  FORMAT_KEYS,
  INSERT_ACTIONS,
} from '@/editor/toolbarActions'
import { useUIStore } from '@/store'

/**
 * Thin layer over editor actions: triggers commands via toolbarActions,
 * reflects format state from UI store. No business logic.
 */
export function EditorToolbar() {
  const [editor] = useLexicalComposerContext()
  const format = useUIStore((s) => s.format)

  return (
    <div className="editor-toolbar" role="toolbar">
      {FORMAT_KEYS.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          aria-pressed={format[key] ? 'true' : 'false'}
          onClick={() => applyFormat(editor, key)}
        >
          {label}
        </button>
      ))}
      <span className="editor-toolbar-separator" aria-hidden />
      {INSERT_ACTIONS.map(({ id, label, title, run }) => (
        <button
          key={id}
          type="button"
          title={title}
          onClick={() => run(editor)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
