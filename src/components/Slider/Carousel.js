import React, { useEffect, useState } from "react";
import "./Carousel.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
const mockData = [
  { id: 1, name: 'John Doe', age: 30 },
  { id: 2, name: 'Jane Smith', age: 25 },
  { id: 3, name: 'Bob Johnson', age: 35 }
];

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

function Carousel(props) {
  let {slider, slider1, slider2} = props
  const [nav, setNav] = useState({nav1: null, nav2: null})
  const [data, setUserData] = useState([]);

  // Fetch data or use mock data
  useEffect(() => {
    fetchData();
  }, []);
  function fetchData() {
    axios.get('http://localhost:8080/api/v1/users/all', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0YW5AZ21haWwuY29tIiwidXNlcm5hbWUiOiJ0YW4iLCJyb2xlcyI6IlJPTEVfQURNSU4iLCJpYXQiOjE2ODgwNDQzMDUsImV4cCI6MTY4ODEzMDcwNX0.mu3CAoWgz1kVQ8ThqmEs91dS5SBkMSxiMa7ChqhLcYY`
    },
  })
  .then(response => {
    setUserData(response.data.data);
    // console.log(response);
    // console.log(data);
  })
  .catch(error => {
    console.log(error);
  });
  }

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
    slidesToShow: 1,
    slidesToScroll: 1,
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
          <div className="title">Các công ty hàng đầu</div>
          <div className="carousel-left-slide">
            <Slider asNavFor={nav.nav2}
                    ref={slider => (slider1 = slider)} 
                    {...settings} slidesToShow={5}>
              {data.map((e,i)=> {
                return (
                  <div key={i}>
                    <div>{e.age}</div>
                    <div>{e.id}</div>
                    <div>{e.name}</div>
                    {/* <img src={e.imgUrl}></img> */}
                    <img src={process.env.PUBLIC_URL + e.imgUrl} alt="My Image" />
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
              
              {/* <div>
                TRỢ GIÁ MÙA DỊCH <br></br> Ưu đãi vô địch
              </div>
              <div>
                NOTE 20 ULTRA 5G  <br></br>  Hotsale giảm sập sàn
              </div>
              <div>
              XR CHÍNH HÃNG  <br></br>  Giá mới cực tốt
              </div>
              <div>
              APPLE WATCH SE  <br></br>  Mua đi chờ chi
              </div>
              <div>
              ĐẠI TIỆC ÂM THANH   <br></br>   Loa sale bung nóc
              </div> */}

            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Carousel;
