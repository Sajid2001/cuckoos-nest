import { OwnTweetsContext } from "../Contexts/OwnTweetsContext"
import { useContext } from 'react'

export const useOwnTweetsContext = () => {
  const context = useContext(OwnTweetsContext)

  if (!context) {
    throw Error('useOwnTweetsContext must be used inside an OwnTweetsContextProvider')
  }

  return context
}