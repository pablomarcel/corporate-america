import { useState } from "react"
import { usePhrasesContext } from "../hooks/usePhrasesContext"
import { useAuthContext } from '../hooks/useAuthContext'

const PhraseForm = () => {
  const { dispatch } = usePhrasesContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const phrase = {title, load, reps}

    const response = await fetch('/api/phrases', {
      method: 'POST',
      body: JSON.stringify(phrase),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTitle('')
      setLoad('')
      setReps('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_PHRASE', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Phrase</h3>

      <label>Phrase:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Company:</label>
      <input
        type="text"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes('load') ? 'error' : ''}
      />

      <label>State:</label>
      <input
        type="text"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <button>Add Phrase</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default PhraseForm
