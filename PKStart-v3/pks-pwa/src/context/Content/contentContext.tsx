import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { CreateNoteRequest, Note, PersonalData } from 'pks-common'
import { useApi } from '../../utils/useApi'
import { useContextUi } from '../UI/uiContext'
import { useContextAuth } from '../Auth/authContext'
import { useContextSnackbar } from '../Snackbar/snackbarContext'
import { StorageKey, useStorage } from '../../utils/useStorage'

function sortNotes(notes: Note[]): Note[] {
  return notes
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .sort((a, b) => (a.pinned === b.pinned ? 0 : a.pinned ? -1 : 1))
    .sort((a, b) => (a.archived === b.archived ? 0 : a.archived ? 1 : -1))
}

interface ContentContextType {
  notes: Note[]
  personalData: PersonalData[]
  fetchData: () => void
  addNote: (note: Partial<Note>) => Promise<{ ok: boolean }>
}

const Context = createContext({} as ContentContextType)

const ContentContext = ({ children }: { children: ReactNode }) => {
  const { get, post } = useApi()
  const { addLoading, removeLoading } = useContextUi()
  const { isLoggedIn, isOnline } = useContextAuth()
  const { showError, showSuccess } = useContextSnackbar()
  const { store, getStored } = useStorage()
  const [notes, setNotes] = useState<Note[]>([])
  const [personalData, setPersonalData] = useState<PersonalData[]>([])
  const [wasLoggedIn, setWasLoggedIn] = useState<boolean>(isLoggedIn)

  const fetchData = async () => {
    try {
      addLoading()
      const [notes, personalData] = await Promise.all([
        get<Note[]>('/notes'),
        get<PersonalData[]>('/personal-data'),
      ])
      setNotes(sortNotes(notes))
      setPersonalData(personalData)
      store<Note[]>(StorageKey.NOTES, notes)
      store<PersonalData[]>(StorageKey.PERSONAL_DATA, personalData)
      showSuccess('Successfully fetched data!')
    } catch (e) {
      showError('Could not fetch data: ' + (e as { message: string }).message)
      console.log(e)
    } finally {
      removeLoading()
    }
  }

  const addNote = async (note: Partial<Note>): Promise<{ ok: boolean }> => {
    try {
      addLoading()
      await post<CreateNoteRequest, void>('/notes', {
        text: note.text || undefined,
        links: note.links?.length ? note.links : undefined,
        pinned: false,
        archived: false,
      })
      showSuccess('Successfully added new note!')
      await fetchData()
      return { ok: true }
    } catch (e) {
      showError('Could not add note: ' + (e as { message: string }).message)
      console.log(e)
      return { ok: false }
    } finally {
      removeLoading()
    }
  }

  useEffect(() => {
    const storedNotes = getStored<Note[]>(StorageKey.NOTES)
    const storedPersonalData = getStored<PersonalData[]>(StorageKey.PERSONAL_DATA)
    if (storedNotes) {
      setNotes(sortNotes(storedNotes))
    }
    if (storedPersonalData) {
      setPersonalData(storedPersonalData)
    }
    setWasLoggedIn(isLoggedIn)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!wasLoggedIn && isLoggedIn && isOnline) {
      fetchData().then()
      setWasLoggedIn(true)
    }
    // eslint-disable-next-line
  }, [isLoggedIn])

  return (
    <Context.Provider
      value={{
        notes,
        personalData,
        fetchData,
        addNote,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useContextContent = () => {
  return useContext(Context)
}

export default ContentContext
