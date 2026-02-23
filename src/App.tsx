import { useEffect, useState } from 'react'
import { PageLayout } from '@/components'
import { Editor } from '@/editor'
import { useEditorStore } from '@/store'
import { loadPersistedContent } from '@/persistence'

/**
 * Loads persisted content into the store before mounting the editor,
 * so the editor can hydrate from contentToHydrate on first run.
 */
function useRestorePersistedContent() {
  const [ready, setReady] = useState(false)
  const loadContent = useEditorStore((s) => s.loadContent)

  useEffect(() => {
    loadPersistedContent().then((content) => {
      if (content) loadContent(content)
      setReady(true)
    })
  }, [loadContent])

  return ready
}

function App() {
  const ready = useRestorePersistedContent()

  return (
    <PageLayout>
      {ready ? <Editor /> : null}
    </PageLayout>
  )
}

export default App
