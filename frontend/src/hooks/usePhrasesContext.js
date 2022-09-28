import { PhrasesContext } from '../context/PhraseContext'
import { useContext } from 'react'

export const usePhrasesContext = () => {
  const context = useContext(PhrasesContext)

  if (!context) {
    throw Error('usePhrasesContext must be used inside an PhrasesContextProvider')
  }

  return context
}
