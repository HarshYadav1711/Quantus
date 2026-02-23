/**
 * Contract for editor content persistence. Implementations can use
 * localStorage, a backend API, or another storage. Kept separate so
 * the rest of the app depends only on this interface.
 */
export type PersistenceAdapter = {
  load: () => Promise<string | null>
  save: (content: string) => Promise<void>
}
