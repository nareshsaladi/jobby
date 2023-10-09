import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header-container">
      <div className="header-container">
        <Link to="/" className="link-style">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>
        <ul className="home-jobs-container">
          <li className="home">
            <Link to="/" className="link-style">
              Home
            </Link>
          </li>

          <li className="jobs">
            <Link to="/jobs" className="link-style">
              Jobs{' '}
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="logout-btn"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}
export default withRouter(Header)
