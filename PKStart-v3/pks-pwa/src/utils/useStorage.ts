export enum StorageKey {
  EMAIL = 'PK_EMAIL',
  USER = 'PK_USER',
  NOTES = 'PK_NOTES',
  PERSONAL_DATA = 'PK_PERSONAL_DATA',
}

export const useStorage = () => {
  function getStored<T>(key: StorageKey): T | null {
    const storedString = localStorage.getItem(key)
    if (!storedString) return null
    return JSON.parse(storedString)
  }

  function getStoredString(key: StorageKey): string | null {
    return localStorage.getItem(key)
  }

  function store<T>(key: StorageKey, value: T): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

  function storeString(key: StorageKey, value: string): void {
    localStorage.setItem(key, value)
  }

  function removeStored(key: StorageKey): void {
    localStorage.removeItem(key)
  }

  return {
    getStored,
    getStoredString,
    store,
    storeString,
    removeStored,
  }
}
