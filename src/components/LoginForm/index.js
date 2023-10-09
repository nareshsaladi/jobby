import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})

    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-bg-container">
        <div className="login-form-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <form className="login-form" onSubmit={this.submitForm}>
            <label htmlFor="userName" className="username-label">
              USERNAME
            </label>
            <input
              type="text"
              value={username}
              id="userName"
              className="user-name"
              placeholder="Username"
              onChange={this.onChangeUserName}
            />
            <label htmlFor="userPassword" className="password-label">
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              id="userPassword"
              className="user-password"
              placeholder="Password"
              onChange={this.onChangePassword}
            />
            <button type="submit" className="login-btn">
              Login
            </button>
            {showSubmitError && <p className="errorMsg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default LoginForm
