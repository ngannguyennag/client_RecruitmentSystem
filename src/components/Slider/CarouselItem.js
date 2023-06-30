import { GetAllDistrict } from "../../actions/OrderAction"

//Company
export function CarouselItem(props){
    const {e} = props
    return (
        <div className="carouselItem_item">
          <img src={e.category_icon} alt="My Image" />
          {/* <div>{e.category_name}</div> */}
          <div className="carouselItem_title">{e.category_name_vn}</div>
          <div className="carouselItem_total">{e.total+ " việc làm"}</div>
        </div>
      )
}

//Job
export function CarouselItemJob(props){
    const{e}= props
    return (
        <div className="carouselItemJob_item">
          <img src={e.companyLogo} alt="My Image" />
          {/* <div>{e.category_name}</div> */}
          <div className="carouselItemJob_title">{e.jobTitle}</div>
          <div className="carouselItemJob_companyName">{e.companyName}</div>
          <div className="carouselItemJob_salary">{e.salary}</div>
          <div className="carouselItemJob_cityNames">{e.cityNames}</div>
        </div>
    )
}

export function CarouselItemCompany(props){
    const {e} = props
    return (
        <div className="carouselItemCompany_item">
          <img src={e.category_icon} alt="My Image" />
          {/* <div>{e.category_name}</div> */}
          <div className="carouselItemCompany_title">{e.category_name}</div>
          <div className="carouselItemCompany_button">{e.category_button}</div>
        </div>
      )
}
// export default all;