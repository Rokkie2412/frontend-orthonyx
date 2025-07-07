import { createContext, useContext } from 'react'

import type {UserContextType} from'./context.types'

export const UserContext = createContext<UserContextType | undefined>(undefined)

export const useUser = (): UserContextType => {
  const context = useContext(UserContext)
  if (!context) throw new Error('useUser must be used within UserContext.Provider')
  return context
}
