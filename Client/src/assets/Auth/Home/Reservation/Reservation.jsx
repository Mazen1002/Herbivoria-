import React, { useEffect, useState } from "react";
import "./Reservation.css";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useDispatch, useSelector } from "react-redux";
import PhoneInput from "react-phone-input-2";
import {
  HandleCheckTable,
  HandleReservationTable,
} from "../../../Toolkit/Slices/ReservationSlice";
import Swal from "sweetalert2";

function Reservation() {
  const { errors } = useSelector((State) => State.Reservation);
  const { user } = useSelector((State) => State.User);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [DateOFReservation, SetDateOFReservation] = useState(new Date());
  const [People, SetPeople] = useState(1);
  const [CommingTime, SetCommingTime] = useState("");
  const [LeavingTime, SetLeavingTime] = useState("");
  const Dispatch = useDispatch();

  const HandleFindTable = () => {
    Dispatch(
      HandleCheckTable({
        name: `${user.FirstName} ${user.LastName}`,
        email: user.email,
        phone: user.Mobile,
        numberOfGuests: People,
        date: DateOFReservation,
        startTime: CommingTime,
        endTime: LeavingTime,
      })
    ).then((res) => {
      if (res.payload.Status == "Success") {
        Swal.fire({
          showCancelButton: true,
          confirmButtonText: "Confirm",
          title: "Confirm Reservation?",
          text: `The Reservation for ${People} , Table for ${`${user.FirstName} ${user.LastName}`}`,
          icon: "question",
        }).then((result) => {
          if (result.isConfirmed) {
            Dispatch(
              HandleReservationTable({
                name: `${user.FirstName} ${user.LastName}`,
                email: user.email,
                phone: user.Mobile,
                numberOfGuests: People,
                date: DateOFReservation,
                startTime: CommingTime,
                endTime: LeavingTime,
              })
            ).then((res) => {
              if (res.payload.Status == "Success") {
                Swal.fire({
                  title: "Confirmed!",
                  text: res.payload.message,
                  icon: "success",
                });
              } else {
                Swal.fire({
                  title: "Oops...!",
                  text: res.payload.message,
                  icon: "error",
                });
              }
            });
          }
        });
      } else {
        Swal.fire({
          title: "Oops...!",
          text: res.payload.message,
          icon: "error",
        });
      }
    });
  };

  return (
    <React.Fragment>
      <div className="reservation" id="reservation">
        <div className="container" data-aos="fade-up">
          <div className="head">
            <p>reservation</p>
            <h1>Book your table</h1>
          </div>
          <div className="form-container">
            <div className="right">
              <div className="date">
                <p>Date of reservation</p>
                <Calendar
                  date={DateOFReservation}
                  onChange={(e) => SetDateOFReservation(e)}
                  minDate={today}
                />
                <p className="Error">{errors["date"]}</p>
              </div>
              <div className="flex-box">
                <div className="input-box">
                  <label htmlFor="startTime">Comming Time</label>
                  <input
                    type="time"
                    id="startTime"
                    value={CommingTime}
                    onChange={(e) => SetCommingTime(e.target.value)}
                  />
                  <p className="Error">{errors["startTime"]}</p>
                </div>
                <div className="input-box">
                  <label htmlFor="endTime">Leaving Time</label>
                  <input
                    type="time"
                    id="endTime"
                    value={LeavingTime}
                    onChange={(e) => SetLeavingTime(e.target.value)}
                  />
                  <p className="Error">{errors["endTime"]}</p>
                </div>
              </div>
            </div>
            <div className="left">
              <div className="input-box">
                <label htmlFor="Name">Full name</label>
                <input
                  type="text"
                  placeholder="Enter your Name"
                  id="Name"
                  value={`${user.FirstName} ${user.LastName}`}
                />
                <p className="Error">{errors["name"]}</p>
              </div>
              <div className="input-box">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  placeholder="Enter your email"
                  id="email"
                  value={user.email}
                />
                <p className="Error">{errors["email"]}</p>
              </div>
              <div className="input-box">
                <label htmlFor="phone">Phone</label>
                <PhoneInput
                  country="EG"
                  value={user.Mobile}
                  placeholder="+20"
                  specialLabel={false}
                />
                <p className="Error">{errors["phone"]}</p>
              </div>
              <div className="input-box">
                <label htmlFor="numberOfGuests">Number of guests</label>
                <input
                  type="number"
                  placeholder="Enter the number of guests"
                  id="numberOfGuests"
                  value={People}
                  onChange={(e) => SetPeople(e.target.value)}
                  min={1}
                  onKeyDown={(e) => e.preventDefault()}
                />
                <p className="Error">{errors["numberOfGuests"]}</p>
              </div>

              <input
                type="button"
                value="Find A Table"
                onClick={() => HandleFindTable()}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Reservation;
