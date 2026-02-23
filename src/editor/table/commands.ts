import type { LexicalEditor } from 'lexical'
import { INSERT_TABLE_COMMAND } from '@lexical/table'

export const DEFAULT_TABLE_ROWS = 3
export const DEFAULT_TABLE_COLUMNS = 3

/**
 * Insert a table at the current selection. Uses Lexical's INSERT_TABLE_COMMAND;
 * dimensions are passed as strings per the command payload.
 */
export function insertTable(
  editor: LexicalEditor,
  rowCount: number = DEFAULT_TABLE_ROWS,
  columnCount: number = DEFAULT_TABLE_COLUMNS,
): void {
  editor.dispatchCommand(INSERT_TABLE_COMMAND, {
    rows: String(rowCount),
    columns: String(columnCount),
  })
}
