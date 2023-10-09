import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {RiSuitcaseLine} from 'react-icons/ri'

import './index.css'

const JobCard = props => {
  const {jobItems} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobItems

  return (
    <Link to={`/jobs/${id}`} className="link-style">
      <li className="job-card-container">
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
        <h1 className="description">Description</h1>
        <p>{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
