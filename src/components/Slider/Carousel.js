import React, { useEffect, useState } from "react";
import "./Carousel.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {CarouselItem} from "./CarouselItem";
// import {CarouselItemJob} from "./CarouselItem";
import axios from "axios";
import { getHotCategory } from "../../actions/HotCategoryAction";
import { useSelector, useDispatch } from 'react-redux';

// const mockData = [
//   { category_icon: "img/img1.png",
//     category_name: "Sales",
//     category_name_vn:"Bán hàng",
//     category_url:"https://www.vietnamworks.com/viec-lam-ban-hang-i33-vn",
//     total:1751
//   },
//   {
//     category_icon: "img/img2.png",
//     category_name: "IT - Software",
//     category_name_vn: "IT - Phần mềm",
//     category_url: "https://www.vietnamworks.com/viec-lam-it-phan-mem-i35-vn",
//     total: 964
//   },
//   {
//     category_icon: "img/img3.png",
//     category_name: "Marketing",
//     category_name_vn: "Marketing",
//     category_url: "https://www.vietnamworks.com/viec-lam-marketing-i27-vn",
//     total: 236
//   },
//   {
//     category_icon: "img/img4.png",
//     category_name: "Administrative/Clerical",
//     category_name_vn: "Thư ký",
//     category_url: "https://www.vietnamworks.com/viec-lam-hanh-chanh-thu-ky-i2-vn",
//     total: 458
//   },
//   {
//     category_icon: "img/img5.png",
//     category_name: "Accounting",
//     category_name_vn: "Kế toán",
//     category_url: "https://www.vietnamworks.com/viec-lam-ke-toan-i1-vn",
//     total: 752
//   },
//   {
//     category_icon: "img/img6.png",
//     category_name: "Customer Service",
//     category_name_vn: "Dịch vụ khách hàng",
//     category_url: "https://www.vietnamworks.com/viec-lam-dich-vu-khach-hang-i11-vn",
//     total: 1300
//   },
//   {
//     category_icon: "img/img7.png",
//     category_name: "Banking",
//     category_name_vn: "Ngân hàng",
//     category_url: "https://www.vietnamworks.com/viec-lam-ngan-hang-i42-vn",
//     total: 189
//   },
//   {
//     category_icon: "img/img8.png",
//     category_name: "Electrical/Electronics",
//     category_name_vn: "Điện/Điện tử",
//     category_url: "https://www.vietnamworks.com/viec-lam-dien-dien-tu-i64-vn",
//     total: 765
//   },
//   {
//     category_icon: "img/img9.png",
//     category_name: "Production/Process",
//     category_name_vn: "Sản xuất",
//     category_url: "https://www.vietnamworks.com/viec-lam-san-xuat-i26-vn",
//     total: 542
//   },
//   {
//     category_icon: "img/img10.png",
//     category_name: "Auditing",
//     category_name_vn: "Kiểm toán",
//     category_url: "https://www.vietnamworks.com/viec-lam-kiem-toan-i58-vn",
//     total: 903
//   },
// ];

// const mockDataJob = [
//   {
//     companyLogo: "img/job1.png",
//     jobTitle: "Kĩ Sư Cao Cấp Thiết Kế Phần Cứng - Senior Hardware Engineer",
//     companyName: "Vines - Vingroup",
//     salary: "Thương lượng",
//     cityNames: "Hà Nội",
//     url: "https://www.vietnamworks.com/ki-su-cao-cap-thiet-ke-phan-cung-senior-hardware-engineer-1663725-jv"
//   },
//   {
//     companyLogo: "img/job2.png",
//     jobTitle: "Nhân Viên Caddie - Novaworld Phan Thiet (Golf)",
//     companyName: "Novaland",
//     salary: "Thương lượng",
//     cityNames: "Bình Dương",
//     url: "https://www.vietnamworks.com/nhan-vien-caddie-novaworld-phan-thiet-golf-1-1663578-jv"
//   },
//   {
//     companyLogo: "img/job3.png",
//     jobTitle: "Giám Đốc Quản Lý Quan Hệ Khách Hàng",
//     companyName: "Techcombank",
//     salary: "Thương lượng",
//     cityNames: "Hồ Chí Minh",
//     url: "https://www.vietnamworks.com/giam-doc-quan-ly-quan-he-khach-hang-1659311-jv"
//   },
//   {
//     companyLogo: "img/job4.png",
//     jobTitle: "Trưởng Nhóm Marketing Tại Hồ Chính Minh (Có Thể Đi Công Tác Các Tỉnh)",
//     companyName: "VUS - The English Center",
//     salary: "$500 - $800",
//     cityNames: "Hồ Chí Minh",
//     url: "https://www.vietnamworks.com/truong-nhom-marketing-tai-ho-chinh-minh-co-the-di-cong-tac-cac-tinh-1651886-jv"
//   },
//   {
//     companyLogo: "img/job5.png",
//     jobTitle: "Sales Representative – Đại Diện Kinh Doanh",
//     companyName: "Công Ty TNHH Cibes Lift Việt Nam",
//     salary: "Thương lượng",
//     cityNames: "Hà Nội, Hải Phòng, Quảng Ninh",
//     url: "https://www.vietnamworks.com/sales-representative-dai-dien-kinh-doanh-7-1647419-jv"
//   },
//   {
//     companyLogo: "img/job6.png",
//     jobTitle: "Software Engineer (C/C++) - Hai Phong - Up to $2000 & Hybrid Working",
//     companyName: "LG Electronics Development Vietnam Company Limite",
//     salary: "$800 - $2000",
//     cityNames: "Hải Phòng",
//     url: "https://www.vietnamworks.com/software-engineer-c-c-plus-plus-hai-phong-up-to-2000-hybrid-working-1665865-jv"
//   },
//   {
//     companyLogo: "img/job7.png",
//     jobTitle: "Associate Manager Distribution Compensation",
//     companyName: "Sun Life Vietnam (Sun Life)",
//     salary: "Thương lượng",
//     cityNames: "Hồ Chí Minh",
//     url: "https://www.vietnamworks.com/associate-manager-distribution-compensation-1-1-1663777-jv"
//   },
//   {
//     companyLogo: "img/job8.png",
//     jobTitle: "Associate Manager Claim Assessor",
//     companyName: "Sun Life Vietnam (Sun Life)",
//     salary: "Thương lượng",
//     cityNames: "Hồ Chí Minh",
//     url: "https://www.vietnamworks.com/associate-manager-claim-assessor-1665759-jv"
//   },
//   {
//     companyLogo: "img/job9.png",
//     jobTitle: "Chuyên Viên Quản Lý Nội Dung Nông Nghiệp Số 2 Nông",
//     companyName: "CÔNG TY CỔ PHẦN PHÂN BÓN DẦU KHÍ CÀ MAU",
//     salary: "Thương lượng",
//     cityNames: "Cà Mau, Hồ Chí Minh",
//     url: "https://www.vietnamworks.com/chuyen-vien-quan-ly-noi-dung-nong-nghiep-so-2-nong-1-1665837-jv"
//   },
//   {
//     companyLogo: "img/job10.png",
//     jobTitle: "Chuyên Viên Triển Khai Phần Mềm",
//     companyName: "1C Vietnam LLC",
//     salary: "Thương lượng",
//     cityNames: "Hà Nội",
//     url: "https://www.vietnamworks.com/chuyen-vien-trien-khai-phan-mem-9-1665828-jv"
//   },

// ]
function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className}`}
      style={{ display: 'none' }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className}`}
      style={{ display: 'none'}}
      onClick={onClick}
    />
  );
}

function Carousel(props,title) {
  let {slider, slider1, slider2} = props
  const [nav, setNav] = useState({nav1: null, nav2: null})
  const [data, setUserData] = useState([]);
  const {user, number} = props
  const hotCategory = useSelector(state => state.hotCategory.hotCategory);
  // console.log(hotCategory);
  const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getHotCategory());
    }, [dispatch]);
  // Fetch data or use mock data
  // useEffect(() => {
  //   fetchData();
  // }, []);
  // function fetchData() {
  //   setUserData(mockData);
  //  axios.get('http://localhost:8080/api/v1/users/all', {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0YW5AZ21haWwuY29tIiwidXNlcm5hbWUiOiJ0YW4iLCJyb2xlcyI6IlJPTEVfQURNSU4iLCJpYXQiOjE2ODgwODM5NTIsImV4cCI6MTY4ODE3MDM1Mn0.EF5TYarN-qAj_3--uUuwrBat1C82YdsN5GmcAErOwEA`
  //   },
  // }) 
  // .then(response => {
  //   setUserData(response.data);
  //   // console.log(response);
  //   // console.log(data);
  // })
  // .catch(error => {
  //   console.log(error);
  // });
  // }

  useEffect(() => {
    setNav({
      nav1: slider1,
      nav2: slider2
    })
  }, [])

  const settings = {
    loop:true,
    dots: false,
    infinite: true,
    // autoplay: true,
    // autoplaySpeed: 2500,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

 
  const next = () =>  {
    slider1.slickNext();
  }
  const previous = () => {
    slider2.slickPrev();
  }

  return (
    <section id="carousel">
      <div className="carousel">
        <div className="carousel-left">
          <div className="title">Ngành nghề trọng điểm</div>
          <div className="carousel-left-slide">
            <Slider asNavFor={nav.nav2}
                    ref={slider => (slider1 = slider)} 
                    {...settings} slidesToShow={5}>
              {hotCategory && hotCategory.map((item,i)=> {
                return (
                  <div key={i} className="carouselItem">
                    <CarouselItem dataFromParent={item}></CarouselItem>
                    {/* <CarouselItem e={e} ></CarouselItem> */}
                  </div>
                )
              })}      
            </Slider>
            <div className='carousel-left-move' onClick={() => previous()}>
                <div className="prev">
                    <LeftOutlined></LeftOutlined>
                </div>
                <div className="next" onClick={() => next()}>
                    <RightOutlined></RightOutlined>
                </div>
            </div>
          </div>
          <div className="carousel-left-bottom">
            <Slider asNavFor={nav.nav1}
                    ref={slider => (slider2 = slider)}
                    slidesToShow={4}
                    swipeToSlide={true}
                    focusOnSelect={true}
                     >
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Carousel;
