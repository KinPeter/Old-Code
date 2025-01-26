import React, { createContext, ReactNode, useContext, useState } from 'react'
import { Alert, Snackbar } from '@mui/material'

export enum SnackbarType {
  INFO = 'info',
  ERROR = 'error',
  SUCCESS = 'success',
}

interface SnackbarContextType {
  showSuccess: (message: string) => void
  showError: (message: string) => void
  showInfo: (message: string) => void
}

const Context = createContext({} as SnackbarContextType)

const SnackbarContext = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [type, setType] = useState<SnackbarType>(SnackbarType.INFO)
  const [message, setMessage] = useState<string>('')

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return
    setOpen(false)
  }

  const showError = (message: string) => {
    setMessage(message)
    setType(SnackbarType.ERROR)
    setOpen(true)
  }

  const showInfo = (message: string) => {
    setMessage(message)
    setType(SnackbarType.INFO)
    setOpen(true)
  }

  const showSuccess = (message: string) => {
    setMessage(message)
    setType(SnackbarType.SUCCESS)
    setOpen(true)
  }

  return (
    <Context.Provider
      value={{
        showError,
        showInfo,
        showSuccess,
      }}
    >
      {children}
      <Snackbar
        open={open}
        autoHideDuration={type === SnackbarType.ERROR ? 10000 : 3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }} elevation={3}>
          {message}
        </Alert>
      </Snackbar>
    </Context.Provider>
  )
}

export const useContextSnackbar = () => {
  return useContext(Context)
}

export default SnackbarContext
