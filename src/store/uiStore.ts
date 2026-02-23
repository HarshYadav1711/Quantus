import { create } from 'zustand'

/** Toolbar format state. Synced from selection by SelectionFormatPlugin. */
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
  setFormat: (partial: Partial<ToolbarFormat>) => void
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
