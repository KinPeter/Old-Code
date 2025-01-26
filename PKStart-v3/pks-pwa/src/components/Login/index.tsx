import React from 'react'
import { AppBar, Dialog, IconButton, Toolbar, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useContextUi } from '../../context/UI/uiContext'
import { FullscreenDialogTransition } from '../common/FullscreenDialogTransition'
import LoginSteps from './LoginSteps'

const LoginDialog = () => {
  const { loginOpen, setLoginOpen } = useContextUi()

  return (
    <Dialog
      fullScreen
      open={loginOpen}
      onClose={() => setLoginOpen(false)}
      TransitionComponent={FullscreenDialogTransition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setLoginOpen(false)}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Login
          </Typography>
        </Toolbar>
      </AppBar>
      <LoginSteps />
    </Dialog>
  )
}

export default LoginDialog
