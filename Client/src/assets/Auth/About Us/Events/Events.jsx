import React from "react";
import "./Events.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";

function Events() {
  return (
    <React.Fragment>
      <div className="Events" data-aos="fade-up">
        <div className="container">
          <div className="head">
            <p>Events</p>
            <h1>Share Your Moments In Our Restaurant</h1>
          </div>
          <div className="content">
            <Swiper
              modules={[Pagination]}
              breakpoints={{
                350: {
                  slidesPerView: 1,
                },
                640: {
                  slidesPerView: 2,
                },

                992: {
                  slidesPerView: 3,
                },
              }}
              pagination={{
                clickable: true,
              }}
              spaceBetween={10}
            >
              <SwiperSlide>
                <div className="card">
                  <img
                    src={require("../../../imgs/events/events-1.jpg")}
                    alt="events-1"
                  />
                  <div className="data">
                    <h3>Birthday Parties</h3>
                    <p className="price">$499</p>
                    <span>
                      Laborum aperiam atque omnis minus omnis est qui assumenda
                      quos. Quis id sit quibusdam. Esse quisquam ducimus officia
                      ipsum ut quibusdam maxime. Non enim perspiciatis.
                    </span>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="card">
                  <img
                    src={require("../../../imgs/events/events-2.jpg")}
                    alt="events-2"
                  />
                  <div className="data">
                    <h3>Private Parties</h3>
                    <p className="price">$289</p>
                    <span>
                      In delectus sint qui et enim. Et ab repudiandae inventore
                      quaerat doloribus. Facere nemo vero est ut dolores ea
                      assumenda et. Delectus saepe accusamus aspernatur.
                    </span>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="card">
                  <img
                    src={require("../../../imgs/events/events-3.jpg")}
                    alt="events-3"
                  />
                  <div className="data">
                    <h3>Custom Parties</h3>
                    <p className="price">$99</p>
                    <span>
                      Quo corporis voluptas ea ad. Consectetur inventore
                      sapiente ipsum voluptas eos omnis facere. Enim facilis
                      veritatis id est rem repudiandae nulla expedita quas.
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Events;
