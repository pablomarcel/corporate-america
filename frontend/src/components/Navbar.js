import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <header>
      <div className="container">
        <h1>Corporate America Lingo</h1>
        <nav>
          <div>
            <span>
              <Link to="/allPhrases" style={{
                padding:"7px",
                border: "2px solid #1aac83",
                borderRadius: "5px"
              }}>All Lingo</Link>
            </span>
            <span>
              <Link to="/" style={{
                padding:"7px",
                border: "2px solid orange",
                borderRadius: "5px",
                marginRight:"5px"
              }}>My Lingo</Link>
            </span>


          </div>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
