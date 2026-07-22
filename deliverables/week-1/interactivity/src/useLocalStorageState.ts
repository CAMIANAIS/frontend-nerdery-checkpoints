import { useState, useEffect } from "react"
// TODO: initialize state from localStorage[key] (JSON-parsed) when present,
// otherwise from initialValue. Write JSON to localStorage on every change.
export function useLocalStorageState<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    const item = localStorage.getItem(key)
    if (item !== null) return JSON.parse(item)
    return initialValue
  })
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  return [value, setValue]


}

