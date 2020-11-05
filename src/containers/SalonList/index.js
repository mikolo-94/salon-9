import React, { useState } from "react";
import "./SalonList.css";
import salons from "./../../../src/data/salons.json";
import { Link } from "react-router-dom";

function SalonList() {
  // could be kept in global state if want to keep the values when navigating between views
  const [filterMenuIsOpen, setFilterMenuIsOpen] = useState(false);
  const [values, setValues] = useState({ from: 25000, to: 50000 });

  // Could argue this should be in a reusable component
  const getRating = (rating) => {
    const array = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        array.push(<img alt="arrow" src="./star-filled.svg" />);
      } else {
        array.push(<img alt="arrow" src="./star-not-filled.svg" />);
      }
    }
    return array;
  };

  const changeValue = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value * 100 });
  };

  let salonsInPriceRange = salons.filter((salon) => {
    return salon.availableTimeSlots.some(
      (timeslot) => timeslot.price <= values.to && timeslot.price >= values.from
    );
  });

  return (
    <div className="Container">
      <header className="Bar">
        <img alt="arrow" src="./arrow-left.svg" />
        <h1 className="ViewTitle">Hår</h1>
        <img alt="filter" src="./filter.svg" />
      </header>

      <div
        className="FilterMenu"
        onClick={() => setFilterMenuIsOpen(!filterMenuIsOpen)}
      >
        <span>
          Pris {values.from / 100} - {values.to / 100} kr
        </span>
        <img alt="arrow" src="./arrow-down.svg" />
      </div>
      {filterMenuIsOpen && (
        <div className="FilterDropdown">
          <div>
            <span>From</span>
            <input
              name="from"
              value={values.from / 100}
              onChange={changeValue}
              className="FilterInput"
              key="from"
            />
          </div>
          <div>
            <span>To</span>
            <input
              name="to"
              value={values.to / 100}
              onChange={changeValue}
              className="FilterInput"
              key="to"
            />
          </div>
        </div>
      )}
      <main>
        {salonsInPriceRange.map((salon) => (
          <Link to={`/salon/${salon.id}`} key={salon.id}>
            <div className="ListRow">
              <div className="TimeSlot">{salon.availableTimeSlots[0].time}</div>
              <div className="Middle">
                <h3 className="SalonTitle">{salon.name}</h3>
                <div className="Rating">
                  {getRating(salon.rating)}

                  <span className="RatingQuantity">
                    ({salon.ratingQuantity})
                  </span>
                </div>
                <p className="Address">{salon.address.street}</p>
              </div>
              <div className="Price">
                <h3 className="ItemPrice">
                  {salon.availableTimeSlots[0].price / 100} kr
                </h3>
                <p className="TimeLength">
                  {salon.availableTimeSlots[0].length} min
                </p>
              </div>
              <img alt="arrow" src="./arrow-right.svg" />
            </div>{" "}
          </Link>
        ))}
      </main>
    </div>
  );
}
export default SalonList;
