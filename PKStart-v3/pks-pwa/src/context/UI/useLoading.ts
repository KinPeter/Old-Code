import { useState } from 'react'

const processes: boolean[] = []

export const useLoading = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const addLoading = () => {
    processes.push(true)
    setLoading(true)
  }

  const removeLoading = () => {
    processes.pop()
    if (processes.length === 0) setLoading(false)
  }

  return {
    loading,
    addLoading,
    removeLoading,
  }
}
