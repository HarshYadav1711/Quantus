import { create } from 'zustand'

/**
 * Serialized editor state (JSON string from EditorState.toJSON()).
 * Stored for persistence; updated by editor sync plugin (debounced).
 */
type SerializedContent = string | null

type EditorStore = {
  /** Last serialized content; used by getContentForPersistence() */
  serializedContent: SerializedContent
  /** One-shot: when set, editor plugin hydrates from this then clears */
  contentToHydrate: SerializedContent
  setSerializedContent: (content: SerializedContent) => void
  /** Set content for editor to load (e.g. from storage). Plugin applies and clears. */
  loadContent: (content: string) => void
  /** Consume contentToHydrate (plugin calls this after applying). Returns value and clears. */
  consumeContentToHydrate: () => SerializedContent
  /** Return current serialized content for persistence. No subscription needed. */
  getContentForPersistence: () => SerializedContent
}

export const useEditorStore = create<EditorStore>((set, get) => ({
  serializedContent: null,
  contentToHydrate: null,
  setSerializedContent: (content) => set({ serializedContent: content }),
  loadContent: (content) =>
    set({ contentToHydrate: content, serializedContent: content }),
  consumeContentToHydrate: () => {
    const value = get().contentToHydrate
    set({ contentToHydrate: null })
    return value
  },
  getContentForPersistence: () => get().serializedContent,
}))
