import { GetAllDistrict } from "../../actions/OrderAction"
import Carousel from "./Carousel";
//Company
export function CarouselItem(props){
    const {dataFromParent} = props
    // console.log(dataFromParent);
    return (
        <div className="carouselItem_item">
          <img src={dataFromParent.categoryIcon} alt="My Image" />
          {/* <div>{e.category_name}</div> */}
          <div className="carouselItem_title">
            <Carousel>{dataFromParent.categoryName}
              </Carousel></div>
          <div className="carouselItem_total">{dataFromParent.total+ " việc làm"}</div>
        </div>
      )
}

//Job
export function CarouselItemJob(props){
  const { e } = props
    return (
        <div className="carouselItemJob_item">
          <img src={e.category_icon} alt="My Image" />
          {/* <div>{e.category_name}</div> */}
          <div className="carouselItemJob_title">{e.categoryName}</div>
          <div className="carouselItemJob_companyName">{e.companyName}</div>
          <div className="carouselItemJob_salary">{e.salary}</div>
          <div className="carouselItemJob_cityNames">{e.cityNames}</div>
        </div>
    )
}

// export function CarouselItemCompany(props){
//     const {e, dataFromParent} = props
//     return (
//         <div className="carouselItemCompany_item">
//           <img src={e.category_icon} alt="My Image" />
//           <div className="carouselItemCompany_title">{e.category_name}</div>
//           <div className="carouselItemCompany_button">{e.category_button}</div>
//         </div>
//       )
// }
// export default all;