import React, { useMemo } from 'react'
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from '@mui/material'
import { Page, useContextUi } from '../../context/UI/uiContext'
import { useDrawer } from './useDrawer'
import { useContextAuth } from '../../context/Auth/authContext'
import LoginIcon from '@mui/icons-material/Login'
import SyncIcon from '@mui/icons-material/Sync'
import NotesIcon from '@mui/icons-material/Notes'
import DataIcon from '@mui/icons-material/FindInPage'
import { useContextContent } from '../../context/Content/contentContext'

enum MenuItem {
  NOTES = 'Notes',
  DATA = 'Personal data',
  SYNC = 'Sync data',
  LOGIN = 'Log in',
}

const Drawer = () => {
  const { drawerOpen, setDrawerOpen, setCurrentPage, setLoginOpen } = useContextUi()
  const { fetchData } = useContextContent()
  const { toggleDrawer } = useDrawer(setDrawerOpen)
  const { isOnline, isLoggedIn } = useContextAuth()

  const handleClick = (name: MenuItem) => {
    switch (name) {
      case MenuItem.NOTES:
        setCurrentPage(Page.NOTES)
        break
      case MenuItem.DATA:
        setCurrentPage(Page.DATA)
        break
      case MenuItem.LOGIN:
        setLoginOpen(true)
        break
      case MenuItem.SYNC:
        fetchData()
        break
    }
    setTimeout(() => {
      setDrawerOpen(false)
    }, 150)
  }

  const items = useMemo(() => {
    return [
      {
        name: MenuItem.NOTES,
        visible: true,
        icon: <NotesIcon />,
        hasDivider: false,
      },
      {
        name: MenuItem.DATA,
        visible: true,
        icon: <DataIcon />,
        hasDivider: true,
      },
      {
        name: MenuItem.SYNC,
        visible: isOnline && isLoggedIn,
        icon: <SyncIcon />,
        hasDivider: false,
      },
      {
        name: MenuItem.LOGIN,
        visible: isOnline && !isLoggedIn,
        icon: <LoginIcon />,
        hasDivider: false,
      },
    ]
  }, [isLoggedIn, isOnline])

  return (
    <SwipeableDrawer
      anchor={'left'}
      open={drawerOpen}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <Box sx={{ width: 250 }} role="presentation">
        <List>
          {items.map(({ name, visible, icon, hasDivider }) =>
            visible ? (
              <React.Fragment key={name}>
                <ListItem button onClick={() => handleClick(name)}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={name} />
                </ListItem>
                {hasDivider ? <Divider sx={{ my: 2 }} /> : null}
              </React.Fragment>
            ) : null
          )}
        </List>
      </Box>
    </SwipeableDrawer>
  )
}

export default Drawer
