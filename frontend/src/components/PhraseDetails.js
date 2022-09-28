import { usePhrasesContext } from '../hooks/usePhrasesContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const PhraseDetails = ({ phrase }) => {
  const { dispatch } = usePhrasesContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/phrases/' + phrase._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_PHRASE', payload: json})
    }
  }

  return (
    <div className="phrase-details">
      <h4>{phrase.title}</h4>
      <p><strong>Company: </strong>{phrase.load}</p>
      <p><strong>State: </strong>{phrase.reps}</p>
      <p>{formatDistanceToNow(new Date(phrase.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default PhraseDetails
