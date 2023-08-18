import React, { useEffect, useState } from "react";
import "./Carousel.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import {CarouselItem} from "./CarouselItem";
import {CarouselItemJob} from "./CarouselItem";
import axios from "axios";
import { getJobTop } from "../../actions/JobAction";
import { useSelector, useDispatch } from 'react-redux';

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
  const jobTop = useSelector(state => state.getJobTop.jobTop);
  const dispatch = useDispatch();
    useEffect(() => {
      if (!jobTop) {
        dispatch(getJobTop());
      }
    }, []);
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
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
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
          <div className="title">Việc làm tốt nhất</div>
          <div className="carousel-left-slide">
            {jobTop && jobTop.length > 0 ? (
              <Slider asNavFor={nav.nav2}
                    ref={slider => (slider1 = slider)} 
                    {...settings} slidesToShow={5}>
              {jobTop.map((item,i)=> {
                return (
                  <div key={i} className="carouselItem">
                    <CarouselItemJob dataFromParent={item} ></CarouselItemJob>
                  </div>
                )
              })} 
            </Slider>
            ) : null}
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
