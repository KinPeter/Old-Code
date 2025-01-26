import React, { useEffect, useState } from 'react'
import {
  AppBar,
  Box,
  CircularProgress,
  Dialog,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import SaveIcon from '@mui/icons-material/Save'
import { useContextUi } from '../../context/UI/uiContext'
import { useContextContent } from '../../context/Content/contentContext'
import { FullscreenDialogTransition } from '../common/FullscreenDialogTransition'
import NoteForm from './NoteForm'
import { Note } from 'pks-common'

const NoteDialog = () => {
  const { noteDialogOpen, setNoteDialogOpen, loading } = useContextUi()
  const { addNote } = useContextContent()
  const [note, setNote] = useState<Pick<Note, 'text' | 'links'>>({ text: '', links: [] })
  const [invalid, setInvalid] = useState<boolean>(true)

  useEffect(() => {
    if (!noteDialogOpen) {
      setNote({ text: '', links: [] })
    }
  }, [noteDialogOpen, setNote])

  useEffect(() => {
    setInvalid(
      (!note.text && (!note.links || note.links?.length === 0)) ||
        (!!note.links && note.links.some(link => !link.name || !link.url))
    )
  }, [note, setInvalid])

  const handleSave = async () => {
    const { ok } = await addNote(note)
    if (ok) {
      setNoteDialogOpen(false)
    }
  }

  return (
    <Dialog
      fullScreen
      open={noteDialogOpen}
      onClose={() => setNoteDialogOpen(false)}
      TransitionComponent={FullscreenDialogTransition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setNoteDialogOpen(false)}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Add note
          </Typography>
          <Box flex={1} />

          {loading ? (
            <CircularProgress color={'inherit'} size={24} />
          ) : (
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleSave}
              aria-label="save"
              disabled={invalid}
            >
              <SaveIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <NoteForm note={note} setNote={setNote} />
    </Dialog>
  )
}

export default NoteDialog
