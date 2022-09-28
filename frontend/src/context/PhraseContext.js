import { createContext, useReducer } from 'react'

export const PhrasesContext = createContext()

export const phrasesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PHRASES':
      return {
        phrases: action.payload
      }
    case 'CREATE_PHRASE':
      return {
        phrases: [action.payload, ...state.phrases]
      }
    case 'DELETE_PHRASE':
      return {
        phrases: state.phrases.filter((w) => w._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const PhrasesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(phrasesReducer, {
    phrases: null
  })

  return (
    <PhrasesContext.Provider value={{...state, dispatch}}>
      { children }
    </PhrasesContext.Provider>
  )
}
