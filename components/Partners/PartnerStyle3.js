import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

import partnerImg1 from "@/public/images/partner/partner1.png";
import partnerImg2 from "@/public/images/partner/partner2.png";
import partnerImg3 from "@/public/images/partner/partner3.png";
import partnerImg4 from "@/public/images/partner/partner4.png";
import partnerImg5 from "@/public/images/partner/partner5.png";

const PartnerStyle3 = () => {
  return (
    <div className="partner-area ptb-100 bg-f9f9f9 br-bottom-100">
      <div className="container">
        <Swiper
          spaceBetween={30}
          breakpoints={{
            0: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 5,
            },
          }}
          autoplay={{
            delay: 6000,
            pauseOnMouseEnter: true,
          }}
          modules={[Autoplay]}
          className="partner-slides"
        >
          <SwiperSlide>
            <div className="partner-item">
              <Image src={partnerImg1} alt="partner-image" />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="partner-item">
              <Image src={partnerImg2} alt="partner-image" />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="partner-item">
              <Image src={partnerImg3} alt="partner-image" />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="partner-item">
              <Image src={partnerImg4} alt="partner-image" />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="partner-item">
              <Image src={partnerImg5} alt="partner-image" />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="partner-item">
              <Image src={partnerImg1} alt="partner-image" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default PartnerStyle3;
