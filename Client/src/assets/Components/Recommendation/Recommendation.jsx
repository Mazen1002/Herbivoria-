import React, { useContext, useState } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "./Recommendation.css";
import { Link } from "react-router-dom";

function Recommendation({
  HandleISInCart,
  min,
  max,
  ActiveBorder,
  scrollToTop,
}) {
  const [Slider, SetSlider] = useState(null);

  const NextSlider = () => {
    Slider.slideNext();
  };
  const PreviousSlider = () => {
    Slider.slidePrev();
  };

  return (
    <React.Fragment>
      <div className="Recommendation">
        <div
          className={ActiveBorder ? "container active" : "container"}
          data-aos="fade-up"
        >
          <div className="head">
            <p>Recommendation</p>
            <h1>Recommended For you</h1>
            <div className="actions">
              <button className="next" onClick={() => PreviousSlider()}>
                <i className="fa-solid fa-angle-left"></i>
              </button>
              <button className="previous" onClick={() => NextSlider()}>
                <i className="fa-solid fa-angle-right"></i>
              </button>
            </div>
          </div>
          <Swiper
            modules={[Pagination]}
            breakpoints={{
              350: {
                slidesPerView: 2,
              },
              640: {
                slidesPerView: 3,
              },

              992: {
                slidesPerView: 4,
              },
            }}
            onSwiper={(s) => {
              SetSlider(s);
            }}
            spaceBetween={5}
          >
            {/* {RecommendationData.slice(min, max).map((item) => (
              <SwiperSlide key={item.id}>
                <div className="RecommendationCard">
                  <i className="fa-regular fa-heart Favorite-ele" />
                  <Link
                    to={`/Details/${item.id}`}
                    onClick={() => scrollToTop()}
                  >
                    <img src={item.img} alt={item.name} />
                    <h5>
                      {item.name.length > 10
                        ? `${item.name.slice(0, 10) + `...`}`
                        : item.name}
                    </h5>
                    <p>
                      {item.Details.length > 50
                        ? `${item.Details.slice(0, 50)}...`
                        : item.Details}
                    </p>
                  </Link>

                  <div className="actions">
                    <div className="price">{item.price} $</div>
                    <button
                      className={item.isInCart ? "btn active" : "btn"}
                      onClick={() => HandleISInCart(item.id)}
                    >
                      <ShoppingCartOutlinedIcon />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))} */}
          </Swiper>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Recommendation;
