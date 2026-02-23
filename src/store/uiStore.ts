import { create } from 'zustand'

/**
 * Text format flags for toolbar. Mirrors selection format when the editor
 * has a range selection; otherwise reflects last known format or defaults.
 */
export type ToolbarFormat = {
  bold: boolean
  italic: boolean
  underline: boolean
  code: boolean
}

const defaultFormat: ToolbarFormat = {
  bold: false,
  italic: false,
  underline: false,
  code: false,
}

type UIStore = {
  format: ToolbarFormat
  /** Update format (e.g. from selection). Partial updates to avoid full replace. */
  setFormat: (partial: Partial<ToolbarFormat>) => void
  /** Reset format to defaults (e.g. when selection is collapsed or null). */
  resetFormat: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  format: defaultFormat,
  setFormat: (partial) =>
    set((state) => ({
      format: { ...state.format, ...partial },
    })),
  resetFormat: () => set({ format: defaultFormat }),
}))
