import {Component} from 'react'
import Header from '../Header'
import './index.css'

class JobApplication extends Component {
  state = {name: '', email: '', message: ''}

  onSubmitDetails = event => {
    event.preventDefault()
  }

  onChangeUserName = event => {
    this.setState({name: event.target.value})
  }

  onChangeEmail = event => {
    this.setState({email: event.target.value})
  }

  onchangeMessage = event => {
    this.setState({message: event.target.value})
  }

  render() {
    const {name, email, message} = this.state

    return (
      <div className="submit-form-bg-container">
        <Header />
        <h1 className="submit-details-heading">Please Submit Your Details</h1>
        <form className="submit-form" onSubmit={this.onSubmitDetails}>
          <label htmlFor="name" className="label-name">
            Name
          </label>
          <input
            type="text"
            value={name}
            id="name"
            className="input-name"
            placeholder="Name"
            onChange={this.onChangeUserName}
          />

          <label htmlFor="email" className="label-email">
            Email
          </label>
          <input
            type="text"
            value={email}
            id="email"
            className="input-email"
            placeholder="Email"
            onChange={this.onChangeEmail}
          />

          <label htmlFor="coverLetter" className="label-cover-letter">
            Cover Letter
          </label>
          <textarea
            cols="50"
            rows="7"
            id="coverLetter"
            value={message}
            className="input-cover-letter"
            placeholder="Enter Message"
            onChange={this.onchangeMessage}
          />
          <button
            type="submit"
            className="submit-btn"
            onClick={this.onClickSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    )
  }
}
export default JobApplication
