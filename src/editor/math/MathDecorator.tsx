import { useCallback, useEffect, useRef, useState } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getNodeByKey } from 'lexical'
import katex from 'katex'
import 'katex/dist/katex.min.css'

type MathDecoratorProps = {
  nodeKey: string
  latex: string
  displayMode: boolean
}

/**
 * Renders math content with KaTeX. Click to edit LaTeX; blur saves to node.
 * Display vs inline controlled by node's displayMode.
 */
export function MathDecorator({
  nodeKey,
  latex,
  displayMode,
}: MathDecoratorProps) {
  const [editor] = useLexicalComposerContext()
  const [editing, setEditing] = useState(false)
  const [editValue, setEditValue] = useState(latex)
  const displayRef = useRef<HTMLSpanElement>(null)

  const commit = useCallback(
    (value: string) => {
      editor.update(() => {
        const node = $getNodeByKey(nodeKey)
        if (node && node.getType() === 'math') {
          ;(node as import('./MathNode').MathNode).getWritable().setLatex(value || ' ')
        }
      })
      setEditing(false)
    },
    [editor, nodeKey]
  )

  useEffect(() => {
    setEditValue(latex)
  }, [latex])

  useEffect(() => {
    if (editing || !displayRef.current) return
    const el = displayRef.current
    el.innerHTML = ''
    if (!latex.trim()) {
      el.textContent = '?'
      return
    }
    try {
      katex.render(latex, el, {
        displayMode,
        throwOnError: false,
        errorColor: '#cc0000',
      })
    } catch {
      el.textContent = 'Error'
    }
  }, [latex, displayMode, editing])

  if (editing) {
    return (
      <span className="editor-math-edit">
        <input
          className="editor-math-input"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={() => commit(editValue)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && displayMode) {
              e.preventDefault()
              commit(editValue)
            }
            if (e.key === 'Escape') {
              setEditValue(latex)
              setEditing(false)
            }
          }}
          autoFocus
          data-testid="math-input"
        />
      </span>
    )
  }

  return (
    <span
      ref={displayRef}
      className={displayMode ? 'editor-math-block' : 'editor-math-inline'}
      role="button"
      tabIndex={0}
      onClick={() => setEditing(true)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setEditing(true)
        }
      }}
      title="Click to edit"
    />
  )
}
