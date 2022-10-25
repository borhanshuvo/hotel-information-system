import React from "react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import image_1 from "../images/image-1134176.jpg";
import image_2 from "../images/image-189296.jpg";
import image_3 from "../images/image-338504.jpg";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Header = () => {
  return (
    <header>
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={image_1} className="img-fluid" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image_2} className="w-100" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image_3} className="w-100" alt="" />
        </SwiperSlide>
      </Swiper>
    </header>
  );
};

export default Header;
