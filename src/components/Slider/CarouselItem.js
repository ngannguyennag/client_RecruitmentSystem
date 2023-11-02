import { GetAllDistrict } from "../../actions/OrderAction"
import Carousel from "./Carousel";
import { Link } from "react-router-dom";

//Company
export function CarouselItem(props) {
  const { dataFromParent } = props
  if (!dataFromParent || !dataFromParent.categoryIcon) {
    return null;
  }
  return (
    <div className="carouselItem_item">
      <img src={dataFromParent.categoryIcon} alt="My Image" />
      <div className="carouselItem_title">
        {dataFromParent.categoryName}</div>
      <div className="carouselItem_total">{dataFromParent.total + " việc làm"}</div>
    </div>
  )
}

//Job
export function CarouselItemJob(props) {
  const { dataFromParent } = props
  console.log(dataFromParent);
  if (!dataFromParent) {
    return null;
  }
  return (
    <div className="carouselItemJob_item">
      <img src={dataFromParent.companyLogo} alt="My Image" />
      <div className="carouselItemJob_title">{dataFromParent.name}</div>
      <div className="carouselItemJob_companyName">{dataFromParent.companyName}</div>
      <div className="carouselItemJob_salary">{dataFromParent.salary + "$"}</div>
    </div>
  )
}

export function CarouselItemCompany(props) {
  const { dataFromParent } = props
  if (!dataFromParent) {
    return null;
  }
  return (
    <div className="carouselItemCompany_item">
      <img src={dataFromParent.companyLogo} alt="My Image" />
      <div className="carouselItemCompany_title">{dataFromParent.companyName}</div>
      <div className="carouselItemCompany_button">
        <Link to="/company"><button>Việc mới</button></Link>
      </div>
    </div>
  )
}