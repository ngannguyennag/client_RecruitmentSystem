import React, { useEffect, useState } from "react";
import "./Carousel.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CarouselItemCompany } from "./CarouselItem";
import { useSelector, useDispatch } from 'react-redux';
import { getCompany } from "../../actions/CompanyAction";
import axios from "axios";

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
      style={{ display: 'none' }}
      onClick={onClick}
    />
  );
}

function Carousel(props, title) {
  let { slider, slider1, slider2 } = props
  const [nav, setNav] = useState({ nav1: null, nav2: null })
  const [data, setUserData] = useState([]);
  const company = useSelector(state => state.getCompany.company);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!company) {
      dispatch(getCompany());
    }
  }, []);

  useEffect(() => {
    setNav({
      nav1: slider1,
      nav2: slider2
    })
  }, [])

  const settings = {
    loop: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const next = () => {
    slider1.slickNext();
  }
  const previous = () => {
    slider2.slickPrev();
  }

  return (
    <section id="carousel">
      <div className="carousel">
        <div className="carousel-left">
          <div className="title">Công ty hàng đầu</div>
          <div className="carousel-left-slide">
            {company && company.length > 0 ? (
              <Slider asNavFor={nav.nav2}
                ref={slider => (slider1 = slider)}
                {...settings} slidesToShow={5}>
                {company.map((item, i) => {
                  return (
                    <div key={i} className="carouselItem">
                      <CarouselItemCompany dataFromParent={item}></CarouselItemCompany>
                    </div>
                  )
                })}
              </Slider>
            ) : null}
            {/* <Slider asNavFor={nav.nav2}
                    ref={slider => (slider1 = slider)} 
                    {...settings} slidesToShow={5}>
              {data.map((e,i)=> {
                return (
                  <div key={i} className="carouselItem">
                    <CarouselItemCompany e={e} ></CarouselItemCompany>
                  </div>
                )
              })}      
            </Slider> */}
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
              slidesToShow={2}
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

