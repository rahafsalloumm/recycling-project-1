import { useEffect, useState } from 'react'

export default function useFetch(apiFunc, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    const loadData = async () => {
      setLoading(true)
      setError('')

      try {
        const result = await apiFunc()

        if (active) {
          setData(result)
        }
      } catch (err) {
        if (active) {
          setError(err?.message || 'Failed to load data')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadData()

    return () => {
      active = false
    }
  }, deps)

  return { data, loading, error }
}