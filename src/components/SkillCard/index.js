import './index.css'

const SkillCard = props => {
  const {skills} = props
  const {name, imageUrl} = skills
  return (
    <li className="skills-container">
      <img src={imageUrl} alt="job img" className="skills-image" />
      <p className="skill-name">{name}</p>
    </li>
  )
}

export default SkillCard
