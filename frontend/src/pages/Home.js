import { useEffect }from 'react'
import { usePhrasesContext } from "../hooks/usePhrasesContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import PhraseDetails from '../components/PhraseDetails'
import PhraseForm from '../components/PhraseForm'

const Home = () => {
  const {phrases, dispatch} = usePhrasesContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchPhrases = async () => {
      const response = await fetch('/api/phrases', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_PHRASES', payload: json})
      }
    }

    if (user) {
      fetchPhrases()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="phrases">
        {phrases && phrases.map((phrase) => (
          <PhraseDetails key={phrase._id} phrase={phrase} />
        ))}
      </div>
      <PhraseForm />
    </div>
  )
}

export default Home
