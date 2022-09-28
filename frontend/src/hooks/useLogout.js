import { useAuthContext } from './useAuthContext'
import { usePhrasesContext } from './usePhrasesContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchPhrases } = usePhrasesContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchPhrases({ type: 'SET_PHRASES', payload: null })
  }

  return { logout }
}
