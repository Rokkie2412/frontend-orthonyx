import type { UserProfile } from "../shared/types"

export type UserContextType =  {
  user: UserProfile | undefined
  setUser: React.Dispatch<React.SetStateAction<UserProfile | undefined>>,
  patiendId: string,
  setPatiendId: React.Dispatch<React.SetStateAction<string>>,
}