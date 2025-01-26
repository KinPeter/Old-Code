import React, { useState } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material'
import ArrowIcon from '@mui/icons-material/ArrowForward'
import { LoginCodeRegex, LoginCodeRequest, LoginRequest, LoginResponse } from 'pks-common'
import { useContextUi } from '../../context/UI/uiContext'
import { useApi } from '../../utils/useApi'
import { StorageKey, useStorage } from '../../utils/useStorage'
import { useContextAuth } from '../../context/Auth/authContext'
import { useContextSnackbar } from '../../context/Snackbar/snackbarContext'

const LoginSteps = () => {
  const { loading, addLoading, removeLoading, setLoginOpen } = useContextUi()
  const { handleLogin } = useContextAuth()
  const { showError, showSuccess } = useContextSnackbar()
  const { post } = useApi()
  const { storeString, getStoredString } = useStorage()
  const [step, setStep] = useState<number>(1)
  const [email, setEmail] = useState<string>(getStoredString(StorageKey.EMAIL) ?? '')
  const [loginCode, setLoginCode] = useState<string>('')

  const getLoginCode = async () => {
    try {
      addLoading()
      storeString(StorageKey.EMAIL, email)
      await post<LoginCodeRequest, void>('/users/login-code', { email }, false)
      setStep(2)
    } catch (e) {
      showError('Could not get login code: ' + (e as { message: string }).message)
      console.log(e)
    } finally {
      removeLoading()
    }
  }

  const login = async () => {
    try {
      addLoading()
      const res = await post<LoginRequest, LoginResponse>(
        '/users/login',
        { email, loginCode },
        false
      )
      handleLogin(res)
      showSuccess('Successfully logged in!')
      setLoginOpen(false)
    } catch (e) {
      showError('Could not log in: ' + (e as { message: string }).message)
      console.log(e)
    } finally {
      removeLoading()
    }
  }

  return (
    <Box
      height={'100%'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      flexDirection={'column'}
    >
      {step === 1 && (
        <>
          <FormControl sx={{ m: 1, width: '300px' }} variant="outlined">
            <InputLabel htmlFor="email-input">Email</InputLabel>
            <OutlinedInput
              id="email-input"
              label="Email"
              type="email"
              inputMode="email"
              value={email}
              onChange={e => {
                setEmail(e.target.value)
              }}
              onKeyPress={event => {
                event.key === 'Enter' && getLoginCode()
              }}
              endAdornment={
                <InputAdornment position="end">
                  {loading ? (
                    <CircularProgress size={24} />
                  ) : (
                    <IconButton
                      aria-label="forward"
                      onClick={getLoginCode}
                      disabled={!email.length || !email.includes('@')}
                      edge="end"
                      color={'primary'}
                    >
                      <ArrowIcon />
                    </IconButton>
                  )}
                </InputAdornment>
              }
            />
          </FormControl>
          <Button size={'small'} sx={{ mt: 2, textTransform: 'none' }} onClick={() => setStep(2)}>
            I have a login code
          </Button>
        </>
      )}
      {step === 2 && (
        <>
          <FormControl sx={{ m: 1, width: '300px' }} variant="outlined">
            <InputLabel htmlFor="login-code-input">Login code</InputLabel>
            <OutlinedInput
              id="login-code-input"
              label="Login code"
              type="text"
              inputMode="numeric"
              value={loginCode}
              onChange={e => {
                setLoginCode(e.target.value)
              }}
              onKeyPress={event => {
                event.key === 'Enter' && login()
              }}
              endAdornment={
                <InputAdornment position="end">
                  {loading ? (
                    <CircularProgress size={24} />
                  ) : (
                    <IconButton
                      aria-label="forward"
                      onClick={login}
                      disabled={!LoginCodeRegex.test(loginCode)}
                      edge="end"
                      color={'primary'}
                    >
                      <ArrowIcon />
                    </IconButton>
                  )}
                </InputAdornment>
              }
            />
          </FormControl>
          <Button size={'small'} sx={{ mt: 2, textTransform: 'none' }} onClick={() => setStep(1)}>
            I need a new login code
          </Button>
        </>
      )}
    </Box>
  )
}

export default LoginSteps
