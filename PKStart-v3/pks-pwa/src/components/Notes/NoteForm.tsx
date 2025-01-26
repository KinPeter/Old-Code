import React, { Dispatch, SetStateAction } from 'react'
import { Box, Button, IconButton, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Close'
import { Note } from 'pks-common'

interface Props {
  note: Pick<Note, 'text' | 'links'>
  setNote: Dispatch<SetStateAction<Pick<Note, 'text' | 'links'>>>
}

const NoteForm = ({ note, setNote }: Props) => {
  const addLink = () => {
    setNote({ ...note, links: [...(note.links ?? []), { name: '', url: '' }] })
  }

  const removeLink = (index: number) => {
    const newLinks = [...(note.links ?? [])]
    newLinks.splice(index, 1)
    setNote({ ...note, links: newLinks })
  }

  const setLinkName = (i: number, v: string) => {
    const newLinks = [...(note.links ?? [])]
    newLinks[i].name = v
    setNote({ ...note, links: newLinks })
  }

  const setLinkUrl = (i: number, v: string) => {
    const newLinks = [...(note.links ?? [])]
    newLinks[i].url = v
    setNote({ ...note, links: newLinks })
  }

  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} p={2}>
      <TextField
        label="Note text"
        multiline
        minRows={4}
        value={note.text}
        sx={{ width: '100%' }}
        onChange={e => setNote({ ...note, text: e.target.value })}
      />
      {note.links &&
        note.links.map((link, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Box flex={1}>
              <TextField
                label="Name"
                size="small"
                sx={{ width: '100%', mb: 1 }}
                value={note.links![index].name}
                onChange={e => setLinkName(index, e.target.value)}
              />
              <TextField
                label="URL"
                size="small"
                sx={{ width: '100%' }}
                value={note.links![index].url}
                onChange={e => setLinkUrl(index, e.target.value)}
              />
            </Box>
            <IconButton size="small" color={'error'} onClick={() => removeLink(index)}>
              <RemoveIcon />
            </IconButton>
          </Box>
        ))}
      <Button sx={{ mt: 2 }} onClick={addLink}>
        <AddIcon />
        Add link
      </Button>
    </Box>
  )
}

export default NoteForm
