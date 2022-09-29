import { useEffect }from 'react'
import { usePhrasesContext } from "../hooks/usePhrasesContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components

import AllPhraseDetails from "../components/AllPhraseDetails";

const Lingo = () => {
  const {phrases, dispatch} = usePhrasesContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchPhrases = async () => {
      const response = await fetch('/api/allPhrases', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      console.log(response)
      if (response.ok) {
        const json = await response.json()
        dispatch({type: 'SET_PHRASES', payload: json})
      }
    }
    //fetchPhrases()
    if (user) {
      fetchPhrases()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="phrases">
        {phrases && phrases.map((phrase) => (
          <AllPhraseDetails key={phrase._id} phrase={phrase} />
        ))}
      </div>
    </div>
  )
}

export default Lingo
