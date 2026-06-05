import { useCallback, useEffect, useState } from 'react'
import { getRegistrationCount } from '../lib/api.js'
import { COUNT_REFRESH_MS, MAX_TEAMS } from '../lib/constants.js'

/**
 * Polls the live registration count every COUNT_REFRESH_MS.
 *
 * Instantiate ONCE (in App) and pass the result down to the counter and
 * the form, so we don't run two polling intervals against Apps Script.
 *
 * Returns { count, max, full, loading, refresh }.
 */
export function useRegistrationCount() {
  const [state, setState] = useState({
    count: 0,
    max: MAX_TEAMS,
    loading: true,
  })

  const refresh = useCallback(async () => {
    const data = await getRegistrationCount()
    setState({ count: data.count, max: data.max, loading: false })
  }, [])

  useEffect(() => {
    refresh()
    const id = setInterval(refresh, COUNT_REFRESH_MS)
    return () => clearInterval(id)
  }, [refresh])

  return {
    ...state,
    full: state.count >= state.max,
    refresh,
  }
}
