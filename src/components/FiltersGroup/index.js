import './index.css'

const FiltersGroup = props => {
  const renderEmploymentTypeList = () => {
    const {employmentTypesList} = props
    return employmentTypesList.map(employment => {
      const {changeEmploymentType, activeEmploymentTypeId} = props
      const onClickEmploymentType = () =>
        changeEmploymentType(employment.employmentTypeId)

      return (
        <li
          key={employment.employmentTypeId}
          className="employment-type-container"
        >
          <input
            type="checkbox"
            value={activeEmploymentTypeId}
            className="check-box"
            id={employment.employmentTypeId}
            onClick={onClickEmploymentType}
          />
          <label htmlFor={employment.employmentTypeId}>
            {employment.label}{' '}
          </label>
        </li>
      )
    })
  }

  const renderSalaryRangeTypeList = () => {
    const {salaryRangesList} = props
    return salaryRangesList.map(salary => {
      const {changeSalaryRangeType, activeSalaryRangeId} = props
      const onClickSalaryRangeType = () =>
        changeSalaryRangeType(salary.salaryRangeId)

      return (
        <li key={salary.salaryRangeId} className="salary-range-list-container">
          <input
            type="radio"
            value={activeSalaryRangeId}
            id={salary.salaryRangeId}
            className="radio-btn"
            onClick={onClickSalaryRangeType}
          />
          <label htmlFor={salary.salaryRangeId}> {salary.label} </label>
        </li>
      )
    })
  }

  return (
    <div>
      <hr className="horizontal-line" />
      <div>
        <h1 className="type-of-employment-heading">Type of Employment</h1>
        {renderEmploymentTypeList()}
      </div>
      <hr className="horizontal-line" />
      <div>
        <h1 className="salary-range-heading">Salary Range</h1>
        {renderSalaryRangeTypeList()}
      </div>
    </div>
  )
}

export default FiltersGroup
