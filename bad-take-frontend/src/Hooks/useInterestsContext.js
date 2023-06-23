import { InterestsContext } from '../Contexts/InterestsContext'
import { useContext } from 'react'

export const useInterestsContext = () => {
  const context = useContext(InterestsContext)

  if (!context) {
    throw Error('useInterestsContext must be used inside an InterestsContextProvider')
  }

  return context
}