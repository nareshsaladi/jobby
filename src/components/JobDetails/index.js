import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {RiSuitcaseLine} from 'react-icons/ri'
import {BiLinkExternal} from 'react-icons/bi'
import Cookies from 'js-cookie'
import Header from '../Header'
import SkillCard from '../SkillCard'
import SimilarJobCard from '../SimilarJobCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {
    jobDetails: {},
    skillsList: [],
    similarJobsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getFormattedData = data => ({
    companyLogoUrl: data.job_details.company_logo_url,
    companyWebsiteUrl: data.job_details.company_website_url,
    employmentType: data.job_details.employment_type,
    id: data.job_details.id,
    jobDescription: data.job_details.job_description,
    location: data.job_details.location,
    packagePerAnnum: data.job_details.package_per_annum,
    rating: data.job_details.rating,
    title: data.job_details.title,
    description: data.job_details.life_at_company.description,

    imageUrl: data.job_details.life_at_company.image_url,
  })

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
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
      const updatedJobDetails = this.getFormattedData(data)
      const updatedSkills = data.job_details.skills.map(skill => ({
        name: skill.name,
        imageUrl: skill.image_url,
      }))
      const updatedSimilarJobs = data.similar_jobs.map(similarJob => ({
        companyLogoUrl: similarJob.company_logo_url,
        employmentType: similarJob.employment_type,
        id: similarJob.id,
        jobDescription: similarJob.job_description,
        location: similarJob.location,
        rating: similarJob.rating,
        title: similarJob.title,
      }))

      this.setState({
        jobDetails: updatedJobDetails,
        skillsList: updatedSkills,
        similarJobsList: updatedSimilarJobs,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSkillsView = () => {
    const {skillsList} = this.state
    return (
      <div>
        <h1 className="skills-heading">Skills</h1>
        <ul className="skills-list-container">
          {skillsList.map(skill => (
            <SkillCard skills={skill} key={skill.name} />
          ))}
        </ul>
      </div>
    )
  }

  renderJobDetailsView = () => {
    const {jobDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      description,
      imageUrl,
    } = jobDetails
    return (
      <div className="job-card-container">
        <div className="logo-title-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div>
            <h1 className="title">{title}</h1>
            <div className="rating-container">
              <AiFillStar className="star-icon" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-package-container">
          <div className="location-container">
            <GoLocation className="location-icon" />
            <p>{location}</p>
            <RiSuitcaseLine className="employment-icon" />
            <p>{employmentType} </p>
          </div>
          <div>
            <p className="package">{packagePerAnnum}</p>
          </div>
        </div>
        <hr />
        <div className="visit-link-container">
          <h1 className="description-heading">Description</h1>
          <a href={companyWebsiteUrl}>
            Visit
            <BiLinkExternal />
          </a>
        </div>
        <p>{jobDescription}</p>
        {this.renderSkillsView()}
        <h1 className="life-at-company-heading">Life at Company</h1>
        <div className="description-image-container">
          <p className="description">{description} </p>
          <img src={imageUrl} alt="company img" className="company-img" />
        </div>
      </div>
    )
  }

  renderSimilarJobsView = () => {
    const {similarJobsList} = this.state

    return (
      <div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list-container">
          {similarJobsList.map(similarJob => (
            <SimilarJobCard
              similarJobDetails={similarJob}
              key={similarJob.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderJobDetailsSuccessView = () => (
    <>
      {this.renderJobDetailsView()}
      {this.renderSimilarJobsView()}
    </>
  )

  onClickRetryJobDetails = () => this.renderJobDetailsSuccessView()

  renderJobDetailsFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="something-wrong-heading">Oops! Something Went Wrong </h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        type="button"
        className="retry-btn"
        onClick={this.onClickRetryJobDetails}
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

  renderJobsView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsSuccessView()
      case apiStatusConstants.failure:
        return this.renderJobDetailsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-details-container">
          <Link to="/jobs/:id/application">
            <button type="button" className="apply-job-btn">
              Apply Now
            </button>
          </Link>
          {this.renderJobsView()}
        </div>
      </>
    )
  }
}
export default JobDetails
