import React from 'react'
import styled from 'styled-components'
import { Box, Card, CardContent, Fab, Link, Typography } from '@mui/material'
import { useContextContent } from '../../context/Content/contentContext'
import LinkIcon from '@mui/icons-material/Link'
import AddIcon from '@mui/icons-material/Add'
import { useContextUi } from '../../context/UI/uiContext'
import { useContextAuth } from '../../context/Auth/authContext'

const FabBox = styled(Box)`
  text-align: right;
  position: fixed;
  right: 12px;
  bottom: 12px;
`

const Notes = () => {
  const { isOnline, isLoggedIn } = useContextAuth()
  const { notes } = useContextContent()
  const { setNoteDialogOpen } = useContextUi()

  return (
    <>
      {notes.map(note => (
        <Card
          variant="outlined"
          key={note.id}
          sx={{ mb: 1, bgcolor: note.archived ? '#E7EBF0FF' : undefined }}
        >
          <CardContent sx={{ paddingBottom: '16px !important' }}>
            {note.text && (
              <Box sx={{ whiteSpace: 'pre-wrap', mb: note.links ? 1 : 0 }}>{note.text}</Box>
            )}
            {note.links &&
              note.links.map(link => (
                <Box key={link.url}>
                  <Link
                    href={link.url}
                    target={'_blank'}
                    underline={'none'}
                    sx={{ display: 'flex' }}
                  >
                    <LinkIcon color={'secondary'} />
                    <Typography color={'secondary'}>{link.name}</Typography>
                  </Link>
                </Box>
              ))}
          </CardContent>
          {/*<CardActions sx={{ alignItems: 'flex-end' }}>*/}
          {/*  <IconButton size="small">Learn More</IconButton>*/}
          {/*</CardActions>*/}
        </Card>
      ))}
      {isOnline && isLoggedIn ? (
        <FabBox>
          <Fab color="primary" aria-label="add" onClick={() => setNoteDialogOpen(true)}>
            <AddIcon />
          </Fab>
        </FabBox>
      ) : null}
    </>
  )
}

export default Notes
