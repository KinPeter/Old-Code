import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { LoginResponse, TokenRefreshRequest, TokenResponse } from 'pks-common'
import { StorageKey, useStorage } from '../../utils/useStorage'
import { User } from '../../types/User'
import { useApi } from '../../utils/useApi'
import { useContextSnackbar } from '../Snackbar/snackbarContext'

interface AuthContextType {
  isLoggedIn: boolean
  isOnline: boolean
  handleLogin: (response: LoginResponse) => void
}

const Context = createContext({} as AuthContextType)

const AuthContext = ({ children }: { children: ReactNode }) => {
  const { store, getStored, removeStored } = useStorage()
  const { post } = useApi()
  const { showError } = useContextSnackbar()
  const [isOnline, setIsOnline] = useState<boolean>(window.navigator.onLine)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  window.addEventListener('online', () => {
    if (!isOnline) setIsOnline(true)
  })
  window.addEventListener('offline', () => {
    if (isOnline) setIsOnline(false)
  })

  useEffect(() => {
    const user = getStored<User>(StorageKey.USER)
    if (user) {
      const expiry = new Date(user.expiresAt).getTime()
      const now = new Date().getTime()
      if (now >= expiry) {
        removeStored(StorageKey.USER)
        setIsLoggedIn(false)
      } else {
        post<TokenRefreshRequest, TokenResponse>('/users/token-refresh', {
          userId: user.id,
        })
          .then((res: TokenResponse) => {
            store<User>(StorageKey.USER, {
              ...user,
              ...res,
            })
          })
          .catch(error => {
            showError('Could not refresh token, logging out')
            console.warn('Could not refresh token, logging out', { error })
            removeStored(StorageKey.USER)
            setIsLoggedIn(false)
          })
        setIsLoggedIn(true)
      }
    }
    //eslint-disable-next-line
  }, [])

  const handleLogin = async (res: LoginResponse) => {
    store<User>(StorageKey.USER, {
      email: res.email,
      id: res.id,
      token: res.token,
      expiresAt: res.expiresAt,
    })
    setIsLoggedIn(true)
  }

  return (
    <Context.Provider value={{ isLoggedIn, isOnline, handleLogin }}>{children}</Context.Provider>
  )
}

export const useContextAuth = () => {
  return useContext(Context)
}

export default AuthContext
