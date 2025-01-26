import React from 'react'
import {
  IconButton,
  Slide,
  Toolbar,
  AppBar as MuiAppBar,
  useScrollTrigger,
  CircularProgress,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useContextUi } from '../../context/UI/uiContext'
import { useDrawer } from '../Drawer/useDrawer'
import WifiOffIcon from '@mui/icons-material/WifiOff'
import { useContextAuth } from '../../context/Auth/authContext'
import styled from 'styled-components'

const HideOnScroll = ({ children }: { children: React.ReactElement }) => {
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

const Spacer = styled.div`
  flex: 1;
`

const AppBar = () => {
  const { setDrawerOpen, loading } = useContextUi()
  const { toggleDrawer } = useDrawer(setDrawerOpen)
  const { isOnline } = useContextAuth()

  return (
    <HideOnScroll>
      <MuiAppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Spacer />
          {loading && <CircularProgress color={'inherit'} size={24} />}
          {!isOnline ? <WifiOffIcon /> : null}
        </Toolbar>
      </MuiAppBar>
    </HideOnScroll>
  )
}

export default AppBar
