import React from 'react'
import { CssBaseline } from '@mui/material'
import AppBar from './components/AppBar'
import Drawer from './components/Drawer'
import UiContext from './context/UI/uiContext'
import Main from './components/Main'
import AuthContext from './context/Auth/authContext'
import LoginDialog from './components/Login'
import SnackbarContext from './context/Snackbar/snackbarContext'
import ContentContext from './context/Content/contentContext'
import NoteDialog from './components/Notes/NoteDialog'

function App() {
  return (
    <SnackbarContext>
      <AuthContext>
        <UiContext>
          <ContentContext>
            <>
              <CssBaseline />
              <Main />
              <AppBar />
              <Drawer />
              <LoginDialog />
              <NoteDialog />
            </>
          </ContentContext>
        </UiContext>
      </AuthContext>
    </SnackbarContext>
  )
}

export default App
