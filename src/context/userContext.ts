import { createContext, useContext } from 'react'
import type { UserProfile } from '../Types'

export interface UserContextType {
  user: UserProfile | undefined
  setUser: React.Dispatch<React.SetStateAction<UserProfile | undefined>>
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export const useUser = (): UserContextType => {
  const context = useContext(UserContext)
  if (!context) throw new Error('useUser must be used within UserContext.Provider')
  return context
}
