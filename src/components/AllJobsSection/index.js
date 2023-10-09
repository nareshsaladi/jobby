import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'
import {AiOutlineSearch} from 'react-icons/ai'

import JobCard from '../JobCard'
import FiltersGroup from '../FiltersGroup'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllJobsSection extends Component {
  state = {
    jobsList: [],
    profileDetails: {},
    activeEmploymentTypeId: '',
    activeSalaryRangeId: '',
    searchInput: '',
    jobsApiStatus: apiStatusConstants.initial,
    profileApiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobs()
    this.getProfile()
  }

  getJobs = async () => {
    this.setState({jobsApiStatus: apiStatusConstants.inProgress})
    const {
      activeEmploymentTypeId,
      activeSalaryRangeId,
      searchInput,
    } = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${activeEmploymentTypeId}&minimum_package=${activeSalaryRangeId}&search=${searchInput}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobsList: updatedData,
        jobsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({jobsApiStatus: apiStatusConstants.failure})
    }
  }

  getProfile = async () => {
    this.setState({profileApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedProfileData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: updatedProfileData,
        profileApiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.seState({profileApiStatus: apiStatusConstants.failure})
    }
  }

  changeEmploymentType = activeEmploymentTypeId => {
    this.setState({activeEmploymentTypeId}, this.getJobs)
  }

  changeSalaryRangeType = activeSalaryRangeId => {
    this.setState({activeSalaryRangeId}, this.getJobs)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterSearchInput = event => {
    const {searchInput} = this.state
    if (event.key === 'Enter') {
      this.setState({searchInput}, this.getJobs)
    }
  }

  renderProfileView = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails

    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile img" className="profile-img" />
        <h1 className="name">{name} </h1>
        <p className="bio">{shortBio} </p>
      </div>
    )
  }

  onClickRetry = () => this.renderProfileView

  renderProfileFailureView = () => (
    <div>
      <button type="button" className="retry-btn" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderFilterGroupsView = () => {
    const {activeEmploymentTypeId, activeSalaryRangeId} = this.state
    return (
      <ul className="filters-group-list-container">
        <FiltersGroup
          changeEmploymentType={this.changeEmploymentType}
          activeEmploymentTypeId={activeEmploymentTypeId}
          employmentTypesList={employmentTypesList}
          changeSalaryRangeType={this.changeSalaryRangeType}
          activeSalaryRangeId={activeSalaryRangeId}
          salaryRangesList={salaryRangesList}
        />
      </ul>
    )
  }

  renderSearchView = () => {
    const {searchInput} = this.state

    return (
      <div className="search-input-container">
        <input
          type="search"
          className="search-input"
          value={searchInput}
          placeholder="search"
          onChange={this.onChangeSearchInput}
          onKeyDown={this.onEnterSearchInput}
        />
        <button type="button" data-testid="searchButton" className="search-btn">
          <AiOutlineSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderJobsView = () => {
    const {jobsList} = this.state
    const shouldShowJobsList = jobsList.length > 0

    return shouldShowJobsList ? (
      <div>
        <ul className="job-card-list-container">
          {jobsList.map(job => (
            <JobCard jobItems={job} key={job.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-jobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-img"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  onClickRetryJobs = () => this.renderJobsView()

  renderJobsFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="something-wrong-heading">Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        type="button"
        className="retry-btn"
        onClick={this.onClickRetryJobs}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderProfile = () => {
    const {profileApiStatus} = this.state

    switch (profileApiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileView()
      case apiStatusConstants.failure:
        return this.renderProfileFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderAllJobs = () => {
    const {jobsApiStatus} = this.state

    switch (jobsApiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsView()

      case apiStatusConstants.failure:
        return this.renderJobsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="all-jobs-section-container">
        <div>
          {this.renderProfile()}
          {this.renderFilterGroupsView()}
        </div>
        <div>
          {this.renderSearchView()}
          {this.renderAllJobs()}
        </div>
      </div>
    )
  }
}
export default AllJobsSection
