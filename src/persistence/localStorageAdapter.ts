import type { PersistenceAdapter } from './types'

const STORAGE_KEY = 'quantus-editor'

/**
 * Persists serialized editor JSON to localStorage. Replace with an
 * API-backed adapter (e.g. persistence/apiAdapter.ts) when a backend exists.
 */
export function createLocalStorageAdapter(): PersistenceAdapter {
  return {
    async load() {
      try {
        return window.localStorage.getItem(STORAGE_KEY)
      } catch {
        return null
      }
    },
    async save(content: string) {
      try {
        window.localStorage.setItem(STORAGE_KEY, content)
      } catch (e) {
        console.warn('[Persistence] Save failed', e)
      }
    },
  }
}
