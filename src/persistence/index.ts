import { createLocalStorageAdapter } from './localStorageAdapter'

export type { PersistenceAdapter } from './types'

/** Single persistence instance. Swap implementation here when adding an API. */
const persistence = createLocalStorageAdapter()

export const loadPersistedContent = (): Promise<string | null> =>
  persistence.load()

export const savePersistedContent = (content: string): Promise<void> =>
  persistence.save(content)
