import { Link } from "react-router-dom";

//Category
export function CarouselItem(props) {
  const { dataFromParent } = props
  if (!dataFromParent || !dataFromParent.icon) {
    return null;
  }
  return (
    <div className="carouselItem_item">
      <img src={dataFromParent.icon} alt="My Image" />
      <div className="carouselItem_title">{dataFromParent.name}</div>
      <div className="carouselItem_total">{dataFromParent.total + " việc làm"}</div>
    </div>
  )
}

//Job
export function CarouselItemJob(props) {
  const { dataFromParent } = props
  if (!dataFromParent || !dataFromParent.companyLogo) {
    return null;
  }
  return (
    <div className="carouselItemJob_item">
      <img src={dataFromParent.companyLogo} alt="My Image" />
      <div className="carouselItemJob_title">{dataFromParent.jobName}</div>
      <div className="carouselItemJob_companyName">{dataFromParent.companyName}</div>
      <div className="carouselItemJob_salary">{dataFromParent.salary }</div>
    </div>
  )
}

//Company
export function CarouselItemCompany(props) {
  const { dataFromParent } = props
  if (!dataFromParent || !dataFromParent.companyLogo) {
    return null;
  }
  return (
    <div className="carouselItemCompany_item">
      <img src={dataFromParent.companyLogo} alt="My Image" />
      <div className="carouselItemCompany_title">{dataFromParent.companyShortName}</div>
      <div className="carouselItemCompany_button">
        <Link to="/company"><button>Việc mới</button></Link>
      </div>
    </div>
  )
}