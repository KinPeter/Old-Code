import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import { useLoading } from './useLoading'

export enum Page {
  NOTES = 'NOTES',
  DATA = 'DATA',
}

interface UiContextType {
  drawerOpen: boolean
  setDrawerOpen: Dispatch<SetStateAction<boolean>>
  loginOpen: boolean
  setLoginOpen: Dispatch<SetStateAction<boolean>>
  noteDialogOpen: boolean
  setNoteDialogOpen: Dispatch<SetStateAction<boolean>>
  currentPage: Page
  setCurrentPage: Dispatch<SetStateAction<Page>>
  loading: boolean
  addLoading: () => void
  removeLoading: () => void
}

const Context = createContext({} as UiContextType)

const UiContext = ({ children }: { children: ReactNode }) => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)
  const [loginOpen, setLoginOpen] = useState<boolean>(false)
  const [noteDialogOpen, setNoteDialogOpen] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<Page>(Page.NOTES)

  const { loading, addLoading, removeLoading } = useLoading()

  return (
    <Context.Provider
      value={{
        drawerOpen,
        setDrawerOpen,
        loginOpen,
        setLoginOpen,
        noteDialogOpen,
        setNoteDialogOpen,
        currentPage,
        setCurrentPage,
        loading,
        addLoading,
        removeLoading,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useContextUi = () => {
  return useContext(Context)
}

export default UiContext
