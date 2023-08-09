import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";

const TestimonialFive = () => {
  return (
    <div className="testimonials-area with-top-border o-hidden ptb-100">
      <div className="container-fluid">
        <div
          className="section-title"
          data-aos="fade-up"
          data-aos-duration="1200"
        >
          <h2 className="nunito-font">
            Here&apos;s what our amazing clients are saying
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur
            mauris amet, placerat fames orci elementum adipiscing.
          </p>
        </div>

        <Swiper
          spaceBetween={25}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 6000,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            1: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            992: {
              slidesPerView: 3,
            },
          }}
          modules={[Pagination, Autoplay]}
          className="testimonials-slides-three"
        >
          <SwiperSlide>
            <div className="single-testimonials-box">
              <i className="flaticon-left-quote"></i>
              <h5>“I never really lost it to begin with.”</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna
                facilisi viverra felis eleifend ornare urna. Eu mauris, velit
                volutpat massa volutpat. Risus pellentesque felis nisl ut
                laoreet euismod vel, integer. Massa sodales lorem nisi, sed
                massa volutpat.
              </p>
              <div className="info">
                <h3>Lora Joly</h3>
                <span>Founder at Envato</span>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="single-testimonials-box">
              <i className="flaticon-left-quote"></i>
              <h5>“Every moment is a fresh beginning.”</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna
                facilisi viverra felis eleifend ornare urna. Eu mauris, velit
                volutpat massa volutpat. Risus pellentesque felis nisl ut
                laoreet euismod vel, integer. Massa sodales lorem nisi, sed
                massa volutpat.
              </p>
              <div className="info">
                <h3>David Warner</h3>
                <span>Founder at ThemeForest</span>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="single-testimonials-box">
              <i className="flaticon-left-quote"></i>
              <h5>“Whatever you do, do it well. From now!”</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna
                facilisi viverra felis eleifend ornare urna. Eu mauris, velit
                volutpat massa volutpat. Risus pellentesque felis nisl ut
                laoreet euismod vel, integer. Massa sodales lorem nisi, sed
                massa volutpat.
              </p>
              <div className="info">
                <h3>James Anderson</h3>
                <span>Founder at EnvyTheme</span>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="single-testimonials-box">
              <i className="flaticon-left-quote"></i>
              <h5>“Whatever you do, do it well. From now!”</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna
                facilisi viverra felis eleifend ornare urna. Eu mauris, velit
                volutpat massa volutpat. Risus pellentesque felis nisl ut
                laoreet euismod vel, integer. Massa sodales lorem nisi, sed
                massa volutpat.
              </p>
              <div className="info">
                <h3>James MM</h3>
                <span>Founder at HB</span>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="single-testimonials-box">
              <i className="flaticon-left-quote"></i>
              <h5>“Whatever you do, do it well. From now!”</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna
                facilisi viverra felis eleifend ornare urna. Eu mauris, velit
                volutpat massa volutpat. Risus pellentesque felis nisl ut
                laoreet euismod vel, integer. Massa sodales lorem nisi, sed
                massa volutpat.
              </p>
              <div className="info">
                <h3>Jisan HR</h3>
                <span>Founder at HIBO</span>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default TestimonialFive;
