import React from 'react'
import { Page, useContextUi } from '../../context/UI/uiContext'
import Notes from '../Notes'
import PersonalData from '../PersonalData'
import { Box } from '@mui/material'

const Main = () => {
  const { currentPage } = useContextUi()

  return (
    <Box bgcolor={'#E7EBF0FF'} p={2} paddingTop={'72px'}>
      {currentPage === Page.NOTES && <Notes />}
      {currentPage === Page.DATA && <PersonalData />}
    </Box>
  )
}

export default Main
