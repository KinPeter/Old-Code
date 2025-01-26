import React, { Dispatch, SetStateAction } from 'react'

export const useDrawer = (setDrawerOpen: Dispatch<SetStateAction<boolean>>) => {
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    setDrawerOpen(open)
  }

  return {
    toggleDrawer,
  }
}
