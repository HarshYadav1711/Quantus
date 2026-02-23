import type { LexicalEditor } from 'lexical'
import { FORMAT_TEXT_COMMAND } from 'lexical'
import type { TextFormatType } from 'lexical'
import { insertBlockMath, insertInlineMath } from './math'
import { insertTable } from './table'
import type { ToolbarFormat } from '@/store'

/** Toolbar-triggerable actions only. Toolbar imports this and calls run(editor); no logic in UI. */
export const FORMAT_KEYS: { key: keyof ToolbarFormat; label: string }[] = [
  { key: 'bold', label: 'B' },
  { key: 'italic', label: 'I' },
  { key: 'underline', label: 'U' },
  { key: 'code', label: 'Code' },
]

export function applyFormat(
  editor: LexicalEditor,
  format: keyof ToolbarFormat
): void {
  editor.dispatchCommand(FORMAT_TEXT_COMMAND, format as TextFormatType)
}

export type InsertAction = {
  id: string
  label: string
  title: string
  run: (editor: LexicalEditor) => void
}

export const INSERT_ACTIONS: InsertAction[] = [
  { id: 'table', label: 'Table', title: 'Insert table', run: insertTable },
  {
    id: 'inline-math',
    label: 'Inline math',
    title: 'Insert inline math',
    run: insertInlineMath,
  },
  {
    id: 'block-math',
    label: 'Block math',
    title: 'Insert block math',
    run: insertBlockMath,
  },
]
