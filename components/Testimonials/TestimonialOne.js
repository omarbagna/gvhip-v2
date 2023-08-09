import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import userImg8 from "@/public/images/user/user8.jpg";
import userImg9 from "@/public/images/user/user9.jpg";
import userImg10 from "@/public/images/user/user10.jpg";

const TestimonialOne = () => {
  return (
    <div className="testimonials-area pt-100 pb-75">
      <div className="container">
        <div
          className="section-title"
          data-aos="fade-up"
          data-aos-duration="1200"
        >
          <span className="sub-title light-green-color">Testimonials</span>
          <h2>Here’s what our amazing clients are saying</h2>
        </div>
 
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="testimonials-slides-two"
        >
          <SwiperSlide>
            <div className="single-testimonials-box">
              <div className="row align-items-center">
                <div className="col-lg-7 col-md-7">
                  <i className="flaticon-left-quote"></i>
                  <h5>“I never really lost it to begin with.”</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Urna facilisi viverra felis eleifend ornare urna. Eu mauris,
                    velit volutpat massa volutpat. Risus pellentesque felis nisl
                    ut laoreet euismod vel, integer. Massa sodales lorem nisi,
                    sed massa volutpat.
                  </p>
                  <div className="info">
                    <h3>Lora Joly</h3>
                    <span>Founder at Envato</span>
                  </div>
                </div>
                <div className="col-lg-5 col-md-5 text-center">
                  <div className="img">
                    <Image src={userImg8} alt="user" />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="single-testimonials-box">
              <div className="row align-items-center">
                <div className="col-lg-7 col-md-7">
                  <i className="flaticon-left-quote"></i>
                  <h5>“Every moment is a fresh beginning.”</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Urna facilisi viverra felis eleifend ornare urna. Eu mauris,
                    velit volutpat massa volutpat. Risus pellentesque felis nisl
                    ut laoreet euismod vel, integer. Massa sodales lorem nisi,
                    sed massa volutpat.
                  </p>
                  <div className="info">
                    <h3>David Warner</h3>
                    <span>Founder at ThemeForest</span>
                  </div>
                </div>
                <div className="col-lg-5 col-md-5 text-center">
                  <div className="img">
                    <Image src={userImg9} alt="user" />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="single-testimonials-box">
              <div className="row align-items-center">
                <div className="col-lg-7 col-md-7">
                  <i className="flaticon-left-quote"></i>
                  <h5>“Whatever you do, do it well.”</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Urna facilisi viverra felis eleifend ornare urna. Eu mauris,
                    velit volutpat massa volutpat. Risus pellentesque felis nisl
                    ut laoreet euismod vel, integer. Massa sodales lorem nisi,
                    sed massa volutpat.
                  </p>
                  <div className="info">
                    <h3>James Anderson</h3>
                    <span>Founder at EnvyTheme</span>
                  </div>
                </div>
                <div className="col-lg-5 col-md-5 text-center">
                  <div className="img">
                    <Image src={userImg10} alt="user" />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default TestimonialOne;
