import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {RiSuitcaseLine} from 'react-icons/ri'

import './index.css'

const SimilarJobCard = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    jobDescription,
  } = similarJobDetails

  return (
    <li className="similar-job-card-container">
      <div className="logo-title-container">
        <img src={companyLogoUrl} alt="company logo" className="company-logo" />
        <div>
          <h1 className="title">{title}</h1>
          <div className="rating-container">
            <AiFillStar className="star-icon" />
            <p>{rating}</p>
          </div>
        </div>
      </div>

      <h1 className="description">Description</h1>
      <p>{jobDescription}</p>
      <div className="location-container">
        <GoLocation className="location-icon" />
        <p>{location}</p>
        <RiSuitcaseLine className="employment-icon" />
        <p>{employmentType} </p>
      </div>
    </li>
  )
}

export default SimilarJobCard
