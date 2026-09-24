import { useCallback, useEffect, useState } from 'react'

export type ColorMode = 'system' | 'light-only' | 'dark-only'

const STORAGE_KEY = 'junlee-color-mode'

function readStoredMode(): ColorMode {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'light-only' || stored === 'dark-only' || stored === 'system') return stored
  } catch {
    // Storage can be blocked; fall back to the system preference.
  }
  return 'system'
}

/** Drives SEED's `data-seed-color-mode` attribute on <html>. */
export function useColorMode() {
  const [mode, setModeState] = useState<ColorMode>(readStoredMode)

  useEffect(() => {
    document.documentElement.dataset.seedColorMode = mode
  }, [mode])

  const setMode = useCallback((next: ColorMode) => {
    setModeState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Keep the in-memory preference only.
    }
  }, [])

  return { mode, setMode }
}
